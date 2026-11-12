  // ==========================================
  // AUDIO PLAYER ENGINE
  // ==========================================

  function formatTime(seconds) {
    if (!Number.isFinite(seconds) || seconds < 0) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }

  function updatePlayUI(playing) {
    state.isPlaying = playing;
    if (dom.iconPlay) dom.iconPlay.hidden = playing;
    if (dom.iconPause) dom.iconPause.hidden = !playing;
    if (dom.btnPlayPause) {
      dom.btnPlayPause.setAttribute("aria-label", playing ? "Jeda audio" : "Putar audio");
    }

    // Sinkronkan tampilan kartu episode & tombol hero
    renderEpisodes();
    syncFeaturedButtons();
  }

  function syncFeaturedButtons() {
    const featuredId = dom.featuredPlayBtn ? dom.featuredPlayBtn.dataset.episodeId : "ep-05";
    const isFeaturedPlaying = state.currentEpisodeId === featuredId && state.isPlaying;

    if (dom.featuredPlayBtn) {
      const label = dom.featuredPlayBtn.querySelector("span");
      if (label) {
        label.textContent = isFeaturedPlaying ? "Jeda Episode Unggulan" : "Putar Episode Unggulan";
      }
    }
  }

  function loadAndPlayEpisode(episodeId, startTimeSeconds = 0) {
    const episode = state.episodes.find((ep) => ep.id === episodeId);
    if (!episode || !dom.audio) return;

    // Jika episode sama dan hanya toggle play/pause (tanpa lompat timestamp)
    if (state.currentEpisodeId === episodeId && startTimeSeconds === 0) {
      togglePlayPause();
      return;
    }

    state.currentEpisodeId = episode.id;

    // Tampilkan Sticky Audio Player Bar
    if (dom.playerBar) {
      dom.playerBar.hidden = false;
      document.body.classList.add("has-active-player");
    }

    // Update informasi di player bar
    if (dom.playerCover) {
      dom.playerCover.src = episode.cover;
      dom.playerCover.alt = `Cover ${episode.title}`;
    }
    if (dom.playerEpLabel) {
      dom.playerEpLabel.textContent = `${episode.number} • ${episode.category}`;
    }
    if (dom.playerTitle) {
      dom.playerTitle.textContent = episode.title;
    }
    if (dom.timeDuration) {
      dom.timeDuration.textContent = episode.duration;
    }

    // Reset slider & muat sumber audio baru
    if (dom.progressSlider) dom.progressSlider.value = 0;
    if (dom.timeCurrent) dom.timeCurrent.textContent = "00:00";

    dom.audio.src = episode.audioUrl;
    dom.audio.playbackRate = state.playbackRates[state.currentRateIndex];

    const playPromise = dom.audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          if (startTimeSeconds > 0 && Number.isFinite(dom.audio.duration)) {
            dom.audio.currentTime = startTimeSeconds;
          }
          updatePlayUI(true);
        })
        .catch(() => {
          // Fallback jika file MP3 lokal belum ditempatkan oleh pengguna
          updatePlayUI(false);
          if (dom.playerTitle) {
            dom.playerTitle.textContent = `${episode.title} (File audio belum tersedia di ${episode.audioUrl})`;
          }
        });
    }
  }

  function togglePlayPause() {
    if (!dom.audio || !state.currentEpisodeId) return;

    if (dom.audio.paused) {
      dom.audio
        .play()
        .then(() => updatePlayUI(true))
        .catch(() => updatePlayUI(false));
    } else {
      dom.audio.pause();
      updatePlayUI(false);
    }
  }

  // Player Controls Event Listeners
  if (dom.btnPlayPause) {
    dom.btnPlayPause.addEventListener("click", togglePlayPause);
  }

  if (dom.btnRewind) {
    dom.btnRewind.addEventListener("click", () => {
      if (!dom.audio) return;
      dom.audio.currentTime = Math.max(0, dom.audio.currentTime - 15);
    });
  }

  if (dom.btnForward) {
    dom.btnForward.addEventListener("click", () => {
      if (!dom.audio || !Number.isFinite(dom.audio.duration)) return;
      dom.audio.currentTime = Math.min(dom.audio.duration, dom.audio.currentTime + 15);
    });
  }

  if (dom.audio) {
    dom.audio.addEventListener("timeupdate", () => {
      if (!Number.isFinite(dom.audio.duration) || dom.audio.duration <= 0) return;
      const percent = (dom.audio.currentTime / dom.audio.duration) * 100;
      if (dom.progressSlider) {
        dom.progressSlider.value = percent;
        dom.progressSlider.style.setProperty("--progress", `${percent}%`);
      }
      if (dom.timeCurrent) {
        dom.timeCurrent.textContent = formatTime(dom.audio.currentTime);
      }
    });

    dom.audio.addEventListener("loadedmetadata", () => {
      if (dom.timeDuration && Number.isFinite(dom.audio.duration)) {
        dom.timeDuration.textContent = formatTime(dom.audio.duration);
      }
    });

    dom.audio.addEventListener("ended", () => {
      updatePlayUI(false);
      if (dom.progressSlider) {
        dom.progressSlider.value = 0;
        dom.progressSlider.style.setProperty("--progress", "0%");
      }
    });
  }

  if (dom.progressSlider) {
    dom.progressSlider.addEventListener("input", (e) => {
      if (!dom.audio || !Number.isFinite(dom.audio.duration)) return;
      const seekPercent = parseFloat(e.target.value);
      dom.audio.currentTime = (seekPercent / 100) * dom.audio.duration;
      dom.progressSlider.style.setProperty("--progress", `${seekPercent}%`);
    });
  }

  // Playback Speed Toggle (1x -> 1.25x -> 1.5x -> 2x)
  if (dom.btnSpeed) {
    dom.btnSpeed.addEventListener("click", () => {
      state.currentRateIndex = (state.currentRateIndex + 1) % state.playbackRates.length;
      const newRate = state.playbackRates[state.currentRateIndex];
      dom.btnSpeed.textContent = `${newRate}x`;
      if (dom.audio) {
        dom.audio.playbackRate = newRate;
      }
    });
  }

  // Volume & Mute Controls
  if (dom.volumeSlider && dom.audio) {
    dom.audio.volume = parseFloat(dom.volumeSlider.value);

    dom.volumeSlider.addEventListener("input", (e) => {
      const vol = parseFloat(e.target.value);
      dom.audio.volume = vol;
      dom.audio.muted = vol === 0;
      if (dom.iconVolOn) dom.iconVolOn.hidden = vol === 0;
      if (dom.iconVolOff) dom.iconVolOff.hidden = vol > 0;
    });
  }

  if (dom.btnMute && dom.audio) {
    dom.btnMute.addEventListener("click", () => {
      dom.audio.muted = !dom.audio.muted;
      const isMuted = dom.audio.muted;
      if (dom.iconVolOn) dom.iconVolOn.hidden = isMuted;
      if (dom.iconVolOff) dom.iconVolOff.hidden = !isMuted;
    });
  }

  // ==========================================
  // MODAL SHOW NOTES & INTERACTION
  // ==========================================

  function parseTimestampToSeconds(timeStr) {
    const parts = timeStr.split(":").map(Number);
    if (parts.length === 2) return parts[0] * 60 + parts[1];
    if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
    return 0;
  }

  function openEpisodeModal(episodeId) {
    const ep = state.episodes.find((item) => item.id === episodeId);
    if (!ep || !dom.modal) return;

    if (dom.modalCover) {
      dom.modalCover.src = ep.cover;
      dom.modalCover.alt = `Cover ${ep.title}`;
    }
    if (dom.modalNum) dom.modalNum.textContent = ep.number;
    if (dom.modalCategory) dom.modalCategory.textContent = ep.category;
    if (dom.modalDate) dom.modalDate.textContent = ep.date;
    if (dom.modalTitle) dom.modalTitle.textContent = ep.title;
    if (dom.modalGuests) dom.modalGuests.textContent = ep.guests;
    if (dom.modalDesc) dom.modalDesc.textContent = ep.description;

    if (dom.modalPlayBtn) {
      dom.modalPlayBtn.dataset.episodeId = ep.id;
    }

    if (dom.modalTimestamps) {
      dom.modalTimestamps.innerHTML = ep.timestamps
        .map(
          (ts) => `
          <li class="timestamp-item">
            <button type="button" class="timestamp-btn" data-episode-id="${escapeHTML(ep.id)}" data-time="${escapeHTML(ts.time)}">
              <span class="ts-code">${escapeHTML(ts.time)}</span>
              <span class="ts-label">${escapeHTML(ts.label)}</span>
            </button>
          </li>
        `
        )
        .join("");
    }

    dom.modal.hidden = false;
    document.body.style.overflow = "hidden";
    if (dom.modalCloseBtn) dom.modalCloseBtn.focus();
  }

  function closeEpisodeModal() {
    if (!dom.modal) return;
    dom.modal.hidden = true;
    document.body.style.overflow = "";
  }

  // Event Delegation untuk Kartu Episode & Tombol Hero
  if (dom.episodesGrid) {
    dom.episodesGrid.addEventListener("click", (e) => {
      const actionBtn = e.target.closest("[data-action]");
      if (!actionBtn) return;

      const { action, episodeId } = actionBtn.dataset;
      if (action === "play") {
        loadAndPlayEpisode(episodeId);
      } else if (action === "detail") {
        openEpisodeModal(episodeId);
      }
    });
  }

  [dom.heroQuickPlay, dom.featuredPlayBtn, dom.featuredCardPlay].forEach((btn) => {
    if (!btn) return;
    btn.addEventListener("click", () => {
      const targetId = btn.dataset.episodeId || "ep-05";
      loadAndPlayEpisode(targetId);
    });
  });

  if (dom.featuredDetailBtn) {
    dom.featuredDetailBtn.addEventListener("click", () => {
      const targetId = dom.featuredDetailBtn.dataset.episodeId || "ep-05";
      openEpisodeModal(targetId);
    });
  }

  if (dom.modalPlayBtn) {
    dom.modalPlayBtn.addEventListener("click", () => {
      const targetId = dom.modalPlayBtn.dataset.episodeId;
      if (targetId) {
        loadAndPlayEpisode(targetId);
        closeEpisodeModal();
      }
    });
  }

  if (dom.modalTimestamps) {
    dom.modalTimestamps.addEventListener("click", (e) => {
      const tsBtn = e.target.closest(".timestamp-btn");
      if (!tsBtn) return;
      const { episodeId, time } = tsBtn.dataset;
      const seconds = parseTimestampToSeconds(time);
      loadAndPlayEpisode(episodeId, seconds);
      closeEpisodeModal();
    });
  }

  if (dom.modalCloseBtn) {
    dom.modalCloseBtn.addEventListener("click", closeEpisodeModal);
  }

  if (dom.modal) {
    dom.modal.addEventListener("click", (e) => {
      if (e.target === dom.modal) closeEpisodeModal();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && dom.modal && !dom.modal.hidden) {
      closeEpisodeModal();
    }
  });

  // ==========================================
  // MOBILE NAVIGATION & TOPIC SUBMISSION FORM
  // ==========================================

  if (dom.mobileMenuToggle && dom.mainNav) {
    dom.mobileMenuToggle.addEventListener("click", () => {
      const isExpanded = dom.mobileMenuToggle.getAttribute("aria-expanded") === "true";
      dom.mobileMenuToggle.setAttribute("aria-expanded", String(!isExpanded));
      dom.mainNav.classList.toggle("is-open", !isExpanded);
    });

    dom.navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        dom.mobileMenuToggle.setAttribute("aria-expanded", "false");
        dom.mainNav.classList.remove("is-open");
      });
    });
  }

  if (dom.topicForm) {
    dom.topicForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const messageInput = document.getElementById("topic-message");
      const nameInput = document.getElementById("sender-name");
      const messageVal = messageInput ? messageInput.value.trim() : "";

      if (!messageVal) {
        if (dom.formFeedback) {
          dom.formFeedback.textContent = "Tuliskan ide topik atau pesanmu terlebih dahulu ya.";
          dom.formFeedback.className = "form-feedback is-error";
        }
        if (messageInput) messageInput.focus();
        return;
      }

      const sender = nameInput && nameInput.value.trim() ? nameInput.value.trim() : "Pendengar Anonim";
      if (dom.formFeedback) {
        dom.formFeedback.textContent = `Terima kasih, ${sender}! Ide topikmu sudah masuk ke catatan tim studio.`;
        dom.formFeedback.className = "form-feedback is-success";
      }

      dom.topicForm.reset();
    });
  }

  // Initial Render Execution
  renderHosts();
  renderEpisodes();
});
