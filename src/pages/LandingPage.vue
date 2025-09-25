<template>
  <div class="page">
    <header class="hero">
      <Navbar />

      <div class="hero-content">
        <p class="eyebrow">Personal tracker</p>
        <h1>Kelola semua hobi Anda dalam satu tempat.</h1>
        <p class="hero-text">
          Pantau perkembangan, temukan inspirasi baru, dan tetap konsisten dengan rutinitas yang
          membuat Anda bersemangat setiap hari.
        </p>

        <div class="hero-actions">
          <button type="button" class="cta-button">Mulai Kelola Hobi</button>
          <button type="button" class="ghost-button">Lihat Fitur</button>
        </div>
      </div>

      <section class="stats">
        <article v-for="stat in stats" :key="stat.label" class="stat-card">
          <p class="stat-label">{{ stat.label }}</p>
          <p class="stat-value">{{ stat.value }}</p>
          <p class="stat-description">{{ stat.description }}</p>
        </article>
      </section>
    </header>

    <main class="main">
      <section class="panel spotlight">
        <div class="panel-header">
          <h2>Kenapa penting mengatur hobi?</h2>
          <p>
            Hobi yang dikelola dengan baik membantu Anda membangun kebiasaan positif, melatih
            kreativitas, dan menjaga mental tetap segar.
          </p>
        </div>
        <div class="panel-body">
          <div class="spotlight-card">
            <h3>Rencana mingguan</h3>
            <p>
              Buat daftar kegiatan dan target mingguan agar setiap sesi hobi terasa lebih bermakna.
            </p>
          </div>
          <div class="spotlight-card">
            <h3>Pilih prioritas</h3>
            <p>
              Fokus pada hobi terpenting dengan daftar prioritas dan pengingat yang mudah diatur.
            </p>
          </div>
          <div class="spotlight-card">
            <h3>Catat progres</h3>
            <p>
              Dokumentasikan perjalanan Anda, sehingga perkembangan dapat terlihat jelas dari waktu
              ke waktu.
            </p>
          </div>
        </div>
      </section>

      <section class="panel feature-grid">
        <header class="panel-header">
          <h2>Fitur utama</h2>
          <p>
            Semua tools yang Anda butuhkan untuk tetap konsisten bersama hobi favorit, hadir dalam
            satu dashboard intuitif.
          </p>
        </header>
        <div class="panel-body">
          <article v-for="feature in features" :key="feature.title" class="feature-card">
            <div class="feature-icon" aria-hidden="true">{{ feature.icon }}</div>
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.description }}</p>
            <ul>
              <li v-for="point in feature.points" :key="point">{{ point }}</li>
            </ul>
          </article>
        </div>
      </section>

      <section class="testimonial panel">
        <div class="testimonial-content">
          <blockquote>
            “Sejak memakai Hobby Control Center, saya tidak pernah lagi melewatkan jadwal latihan.
            Antarmukanya sederhana tapi sangat membantu.”
          </blockquote>
          <p class="author">— Nadya Putri, Ilustrator &amp; Pecinta Musik</p>
        </div>
        <div class="testimonial-cta">
          <h3>Siap memulai perjalanan hobi Anda?</h3>
          <p>Gabung sekarang dan temukan potensi terbaik dari setiap kegiatan yang Anda cintai.</p>
          <button type="button" class="cta-button">Daftar Gratis</button>
        </div>
      </section>
    </main>

    <footer class="footer">
      <p>© {{ currentYear }} Hobby Control Center. Dibuat untuk membantu Anda berkembang.</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Navbar from '../components/NavbarPage.vue'

const stats = [
  {
    label: 'Total Hobi',
    value: '12',
    description: 'Semua hobi tersinkronisasi dari perangkat Anda.',
  },
  {
    label: 'Sesi Aktif Bulan Ini',
    value: '36',
    description: 'Catatan aktivitas terbaru dalam empat minggu terakhir.',
  },
  {
    label: 'Target Minggu Ini',
    value: '5',
    description: 'Target yang Anda tetapkan untuk menjaga konsistensi.',
  },
]

const features = [
  {
    icon: '📋',
    title: 'Rencana Dinamis',
    description: 'Atur rencana hobi mingguan dengan mudah dan fleksibel.',
    points: ['Drag-and-drop jadwal', 'Template siap pakai', 'Penyesuaian otomatis'],
  },
  {
    icon: '✨',
    title: 'Insight Cerdas',
    description: 'Pantau perkembangan Anda melalui grafik dan insight personal.',
    points: ['Rangkuman mingguan', 'Rekomendasi aktivitas', 'Statistik progres'],
  },
  {
    icon: '🤝',
    title: 'Kolaborasi Ringan',
    description: 'Ajak teman atau komunitas untuk saling mendukung.',
    points: ['Daftar kegiatan bersama', 'Tantangan kelompok', 'Berbagi pencapaian'],
  },
]

const currentYear = computed(() => new Date().getFullYear())
</script>

<style>
:root {
  --color-background: #071427;
  --color-surface: #0f213f;
  --color-card: #16325f;
  --color-accent: #38bdf8;
  --color-text: #e2e8f0;
  --font-primary: 'Poppins', 'Helvetica Neue', Arial, sans-serif;
  --font-secondary: 'Inter', 'Segoe UI', sans-serif;
  --radius-base: 18px;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: var(--font-secondary);
  background: var(--color-background);
  color: var(--color-text);
  min-height: 100vh;
}

.page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background:
    radial-gradient(90% 90% at 20% 20%, rgba(56, 189, 248, 0.08), transparent),
    radial-gradient(70% 70% at 80% 0%, rgba(56, 189, 248, 0.05), transparent),
    var(--color-background);
}

.hero {
  padding: 3rem 8vw 2rem;
  background-color: rgba(7, 20, 39, 0.75);
  border-bottom: 1px solid rgba(226, 232, 240, 0.06);
  backdrop-filter: blur(32px);
}

.hero-content {
  max-width: 680px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.eyebrow {
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.18em;
  color: rgba(226, 232, 240, 0.55);
}

.hero-content h1 {
  font-family: var(--font-primary);
  font-size: clamp(2.5rem, 5vw, 3.4rem);
  margin: 0;
  line-height: 1.12;
}

.hero-text {
  font-size: 1rem;
  line-height: 1.7;
  color: rgba(226, 232, 240, 0.72);
  margin: 0;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.cta-button,
.ghost-button {
  border: none;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 600;
  border-radius: 999px;
  padding: 0.85rem 1.8rem;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    background-color 0.2s ease;
}

.cta-button {
  background-color: var(--color-accent);
  color: #04121f;
  box-shadow: 0 16px 32px rgba(56, 189, 248, 0.32);
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 40px rgba(56, 189, 248, 0.38);
}

.ghost-button {
  background-color: rgba(226, 232, 240, 0.08);
  color: var(--color-text);
}

.ghost-button:hover {
  background-color: rgba(226, 232, 240, 0.18);
}

.stats {
  margin-top: 3.5rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
}

.stat-card {
  background: linear-gradient(180deg, rgba(15, 33, 63, 0.9), rgba(21, 50, 84, 0.88));
  border: 1px solid rgba(56, 189, 248, 0.12);
  border-radius: var(--radius-base);
  padding: 1.5rem;
  display: grid;
  gap: 0.75rem;
  box-shadow: 0 16px 30px rgba(6, 20, 41, 0.45);
}

.stat-label {
  font-size: 0.9rem;
  color: rgba(226, 232, 240, 0.55);
  margin: 0;
}

.stat-value {
  font-size: 2.2rem;
  font-family: var(--font-primary);
  margin: 0;
}

.stat-description {
  font-size: 0.9rem;
  color: rgba(226, 232, 240, 0.6);
  margin: 0;
  line-height: 1.6;
}

.main {
  flex: 1;
  padding: 4rem 8vw 3rem;
  display: flex;
  flex-direction: column;
  gap: 3.5rem;
}

.panel {
  background: rgba(15, 33, 63, 0.72);
  border: 1px solid rgba(56, 189, 248, 0.08);
  border-radius: calc(var(--radius-base) + 4px);
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.02),
    0 18px 42px rgba(4, 12, 26, 0.55);
}

.panel-header {
  max-width: 520px;
  display: grid;
  gap: 0.75rem;
}

.panel-header h2 {
  font-family: var(--font-primary);
  font-size: 2rem;
  margin: 0;
}

.panel-header p {
  color: rgba(226, 232, 240, 0.7);
  margin: 0;
  line-height: 1.7;
}

.spotlight .panel-body {
  display: grid;
  gap: 1.75rem;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

.spotlight-card {
  background-color: rgba(21, 50, 84, 0.85);
  border-radius: var(--radius-base);
  padding: 1.75rem;
  border: 1px solid rgba(56, 189, 248, 0.1);
  display: grid;
  gap: 0.75rem;
}

.spotlight-card h3 {
  margin: 0;
  font-family: var(--font-primary);
  font-size: 1.1rem;
}

.spotlight-card p {
  margin: 0;
  color: rgba(226, 232, 240, 0.7);
  line-height: 1.6;
}

.feature-grid .panel-body {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
}

.feature-card {
  background-color: rgba(21, 50, 84, 0.82);
  border-radius: var(--radius-base);
  padding: 1.8rem;
  border: 1px solid rgba(56, 189, 248, 0.1);
  display: grid;
  gap: 0.9rem;
  transition:
    transform 0.2s ease,
    border-color 0.2s ease;
}

.feature-card:hover {
  transform: translateY(-4px);
  border-color: rgba(56, 189, 248, 0.25);
}

.feature-icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background-color: rgba(56, 189, 248, 0.18);
  display: grid;
  place-items: center;
  font-size: 1.4rem;
}

.feature-card h3 {
  margin: 0;
  font-family: var(--font-primary);
  font-size: 1.15rem;
}

.feature-card p {
  color: rgba(226, 232, 240, 0.68);
  margin: 0;
  line-height: 1.6;
}

.feature-card ul {
  margin: 0;
  padding-left: 1.15rem;
  display: grid;
  gap: 0.35rem;
  color: rgba(226, 232, 240, 0.6);
  font-size: 0.95rem;
}

.testimonial {
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  align-items: center;
}

.testimonial-content {
  display: grid;
  gap: 1rem;
}

blockquote {
  font-size: 1.2rem;
  margin: 0;
  line-height: 1.7;
  font-family: var(--font-primary);
  color: rgba(226, 232, 240, 0.9);
}

.author {
  margin: 0;
  color: rgba(226, 232, 240, 0.55);
  font-size: 0.95rem;
}

.testimonial-cta {
  background: rgba(21, 50, 84, 0.95);
  border-radius: var(--radius-base);
  padding: 2rem;
  display: grid;
  gap: 0.85rem;
  border: 1px solid rgba(56, 189, 248, 0.14);
}

.testimonial-cta h3 {
  margin: 0;
  font-family: var(--font-primary);
  font-size: 1.4rem;
}

.testimonial-cta p {
  margin: 0;
  color: rgba(226, 232, 240, 0.7);
  line-height: 1.6;
}

.footer {
  padding: 2.5rem 8vw 2rem;
  border-top: 1px solid rgba(226, 232, 240, 0.08);
  text-align: center;
  font-size: 0.9rem;
  color: rgba(226, 232, 240, 0.5);
}

@media (max-width: 720px) {
  .hero {
    padding: 2.5rem 1.5rem 2rem;
  }

  .main {
    padding: 3rem 1.5rem;
  }

  .panel {
    padding: 2rem;
  }

  .hero-actions {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
