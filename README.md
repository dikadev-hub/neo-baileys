# neo-baileys CLI

[![npm version](https://img.shields.io/npm/v/neo-baileys.svg?style=flat-square)](https://www.npmjs.com/package/neo-baileys)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg?style=flat-square)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

Bridge CLI untuk mengirim template tombol interaktif, pesan Rich HTML, katalog menu, dan media langsung ke **Neo Chat** secara instan.

---

## 📋 Daftar Isi
- [Prasyarat](#-prasyarat)
- [Instalasi](#-instalasi)
- [Autentikasi & Setup](#-autentikasi--setup)
- [Penggunaan CLI](#-penggunaan-cli)
- [Contoh Alur Penggunaan Riil](#-contoh-alur-penggunaan-riil)
- [Format Payload JSON](#-format-payload-json)
  - [1. Tombol Interaktif (Interactive Buttons)](#1-tombol-interaktif-interactive-buttons)
  - [2. Pesan Rich HTML](#2-pesan-rich-html)
  - [3. Daftar Pilihan (Interactive List)](#3-daftar-pilihan-interactive-list)
  - [4. Pesan Media (Gambar / Base64)](#4-pesan-media-gambar--base64)
- [Troubleshooting](#-troubleshooting)
- [Lisensi](#-lisensi)

---

## 📌 Prasyarat

Sebelum memulai, pastikan kamu telah menyiapkan:
- **Node.js** v18.0.0 atau versi yang lebih baru.
- Akun **Neo Chat** aktif.
- **Device Token** (diambil dari menu **Settings / Pairing Device** di aplikasi Neo Chat).
- **ID Kontak (User ID)** penerima pesan.

---

## 🚀 Instalasi

Pasang package secara global melalui npm:

```bash
npm install -g neo-baileys
