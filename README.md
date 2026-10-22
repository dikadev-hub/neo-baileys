<h1 align="center">⚡ neo-baileys CLI</h1>
<h3 align="center">Bridge CLI & Tooling Pesan Interaktif untuk Neo Chat</h3>

<p align="center">
  <em>Kirim template tombol, rich HTML, katalog menu, dan media langsung ke ekosistem Neo Chat secara instan.</em>
</p>

<p align="center">
  <img src="https://img.shields.io/npm/v/neo-baileys?style=for-the-badge&color=22c55e&logo=npm" alt="npm version" />
  <img src="https://img.shields.io/badge/Node.js-%3E%3D18.0.0-22c55e?style=for-the-badge&logo=node.js&logoColor=white" alt="node version" />
  <img src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge" alt="license" />
  <img src="https://img.shields.io/badge/Author-dika_x_dev-10b981?style=for-the-badge&logo=github" alt="author" />
</p>

<p align="center">
  <img src="https://komarev.com/ghpvc/?username=dikaxdev-hub-neo-baileys&label=Views&color=22c55e&style=flat-square" alt="repo views" />
</p>

---

### 📋 Daftar Isi
- [📌 Prasyarat](#-prasyarat)
- [🚀 Instalasi](#-instalasi)
- [🔑 Autentikasi & Setup](#-autentikasi--setup)
- [💻 Perintah Penggunaan CLI](#-perintah-penggunaan-cli)
- [💡 Contoh Skenario Cepat](#-contoh-skenario-cepat)
- [📦 Format File Payload JSON](#-format-file-payload-json)
  - [1. Tombol Interaktif (Interactive Buttons)](#1-tombol-interaktif-interactive-buttons)
  - [2. Pesan Rich HTML](#2-pesan-rich-html)
  - [3. Menu Pilihan Bertingkat (Interactive List)](#3-menu-pilihan-bertingkat-interactive-list)
  - [4. Pesan Media Gambar (Base64)](#4-pesan-media-gambar-base64)
- [🛠️ Troubleshooting](#️-troubleshooting)
- [📄 Lisensi](#-lisensi)

---

### 📌 Prasyarat

Sebelum menjalankan CLI, pastikan perangkat kamu sudah memiliki:
1. **Node.js** v18.0.0 ke atas.
2. Akun **Neo Chat** aktif.
3. **Device Token** dari menu *Settings / Pairing Device* pada aplikasi Neo Chat.
4. **User ID Kontak** penerima yang sudah terhubung/berteman di Neo Chat.

---

### 🚀 Instalasi

Pasang package secara global via terminal:

```bash
npm install -g neo-baileys
```

Atau jalankan instan tanpa instalasi manual:

```bash
npx neo-baileys --help
```

---

### 🔑 Autentikasi & Setup

Simpan token perangkat agar CLI mengenali sesi login kamu:

```bash
# Metode 1: Menggunakan perintah login bawaan
neo-baileys login <DEVICE_TOKEN_KAMU>

# Metode 2: Menggunakan Environment Variable
export NEO_DEVICE_TOKEN="token_kamu_di_sini"
```

---

### 💻 Perintah Penggunaan CLI

Kamu bisa mengirim payload JSON yang disimpan dalam file:

```bash
# 1. Kirim menggunakan file JSON yang sudah ada target "toId"
neo-baileys send --payload ./pesan.json

# 2. Kirim dengan menentukan target ID langsung di terminal
neo-baileys send --to "id_user_tujuan" --payload ./pesan.json
```

---

### 💡 Contoh Skenario Cepat

#### Langkah 1: Buat file `promo.json`
Simpan kode JSON berikut ke dalam file `promo.json`:

```json
{
  "toId": "id_user_tujuan",
  "text": "Halo! Ada promo menarik untukmu hari ini:",
  "interactive": {
    "kind": "buttons",
    "text": "Silakan pilih menu di bawah:",
    "buttons": [
      {
        "type": "reply",
        "id": "btn_klaim",
        "text": "Klaim Voucher",
        "icon": "fa-gift"
      },
      {
        "type": "cta",
        "text": "Hubungi Admin",
        "url": "https://wa.me/6281234567890",
        "icon": "fa-whatsapp"
      }
    ]
  }
}
```

#### Langkah 2: Eksekusi Kirim
Ketik perintah ini di terminal:

```bash
neo-baileys send --payload ./promo.json
```

---

### 📦 Format File Payload JSON

Simpan setiap payload di bawah ke dalam file berformat `.json` sebelum dikirim:

#### 1. Tombol Interaktif (Interactive Buttons)
> Simpan dengan nama file: `buttons.json`

```json
{
  "toId": "id_user_tujuan",
  "text": "Pilih menu layanan kami:",
  "interactive": {
    "kind": "buttons",
    "text": "Silakan pilih salah satu opsi:",
    "buttons": [
      {
        "type": "reply",
        "id": "btn_katalog",
        "text": "Buka Katalog",
        "icon": "fa-store"
      },
      {
        "type": "cta",
        "text": "Chat Admin WhatsApp",
        "url": "https://wa.me/6281234567890",
        "icon": "fa-whatsapp"
      }
    ]
  }
}
```

---

#### 2. Pesan Rich HTML
> Simpan dengan nama file: `rich.json`

```json
{
  "toId": "id_user_tujuan",
  "rich": {
    "html": "<div style='padding:16px;background:#1e293b;border-radius:12px;color:#fff;text-align:center'><h2 style='margin:0 0 10px;color:#22c55e'>Promo Spesial</h2><p style='color:#94a3b8;margin:0 0 14px'>Diskon 50% khusus hari ini!</p><button style='padding:10px 18px;background:#22c55e;border:none;border-radius:8px;color:#fff;font-weight:bold;cursor:pointer' onclick='window.parent.postMessage({type:\"rich-event\",event:\"klaim\"},\"*\")'>Klaim Sekarang</button></div>",
    "height": 200,
    "buttons": [
      {
        "id": "klaim",
        "text": "Klaim Promo",
        "event": "klaim",
        "mode": "chat"
      }
    ]
  }
}
```

---

#### 3. Menu Pilihan Bertingkat (Interactive List)
> Simpan dengan nama file: `list.json`

```json
{
  "toId": "id_user_tujuan",
  "interactive": {
    "kind": "list",
    "title": "Daftar Menu Resto",
    "text": "Silakan pilih pesananmu:",
    "triggerText": "Buka Menu",
    "sections": [
      {
        "title": "Makanan Utama",
        "rows": [
          {
            "id": "nasi_goreng",
            "title": "Nasi Goreng Spesial",
            "description": "Rp 15.000 - Lengkap telur & ayam"
          },
          {
            "id": "mie_ayam",
            "title": "Mie Ayam Bakso",
            "description": "Rp 12.000 - Kuah terpisah"
          }
        ]
      }
    ]
  }
}
```

---

#### 4. Pesan Media Gambar (Base64)
> Simpan dengan nama file: `media.json`

```json
{
  "toId": "id_user_tujuan",
  "text": "Lampiran foto bukti pengiriman:",
  "media": {
    "type": "image",
    "data": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD..."
  }
}
```

---

### 🛠️ Troubleshooting

| Pesan Kendala | Penyebab Masalah | Solusi |
| :--- | :--- | :--- |
| `Unauthorized / 401` | Device token salah atau sesi telah kedaluwarsa | Ambil token baru di Neo Chat, lalu jalankan `neo-baileys login`. |
| `User not found / 404` | ID target belum terdaftar atau belum jadi kontak | Pastikan ID target benar dan sudah saling berteman di Neo Chat. |
| `SyntaxError: Unexpected token` | Format file JSON rusak | Cek tanda koma dan kutip file JSON menggunakan JSON Linter online. |

---

<h3 align="center">Connect with Developer</h3>
<p align="center">
  <a href="https://github.com/dikaxdev-hub" target="_blank">
    <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"/>
  </a>&nbsp;
  <a href="https://wa.me/628xxx" target="_blank">
    <img src="https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white" alt="WhatsApp"/>
  </a>&nbsp;
  <a href="mailto:dika@neochat.web.id" target="_blank">
    <img src="https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Email"/>
  </a>
</p>

---

### 📄 Lisensi

Proyek ini berada di bawah naungan lisensi **MIT**. Silakan cek berkas `LICENSE` untuk informasi selengkapnya.
