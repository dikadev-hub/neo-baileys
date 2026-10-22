# neo-baileys CLI

[![npm version](https://img.shields.io/npm/v/neo-baileys.svg?style=flat-square)](https://www.npmjs.com/package/neo-baileys)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg?style=flat-square)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

Bridge CLI untuk mengirim template tombol interaktif, pesan Rich HTML, katalog list menu, dan media langsung ke **Neo Chat** secara instan.

---

## 📋 Daftar Isi
- [Prasyarat](#prasyarat)
- [Instalasi](#instalasi)
- [Autentikasi & Setup](#autentikasi--setup)
- [Cara Menggunakan](#cara-menggunakan)
- [Contoh Payload Pesan](#contoh-payload-pesan)
  - [1. Tombol Interaktif (`buttons.json`)](#1-tombol-interaktif-buttonsjson)
  - [2. Pesan Rich HTML (`rich.json`)](#2-pesan-rich-html-richjson)
  - [3. Daftar Pilihan List (`list.json`)](#3-daftar-pilihan-list-listjson)
  - [4. Pesan Media Gambar (`media.json`)](#4-pesan-media-gambar-mediajson)
- [Troubleshooting](#troubleshooting)
- [Lisensi](#lisensi)

---

## Prasyarat

Sebelum memulai, pastikan kamu telah menyiapkan:
- **Node.js** versi 18.0.0 atau yang lebih baru.
- Akun **Neo Chat** yang aktif.
- **Device Token** (diambil dari menu **Settings / Pairing Device** di aplikasi Neo Chat).
- **ID Kontak (User ID)** penerima pesan.

---

## Instalasi

Pasang package secara global melalui npm:

```bash
npm install -g neo-baileys
```

Atau jalankan langsung tanpa instalasi lokal menggunakan `npx`:

```bash
npx neo-baileys --help
```

---

## Autentikasi & Setup

Simpan token perangkat kamu agar CLI dapat mengenali sesi akun:

```bash
# Opsi 1: Menggunakan command login bawaan
neo-baileys login <DEVICE_TOKEN_KAMU>

# Opsi 2: Menggunakan Environment Variable
export NEO_DEVICE_TOKEN="token_kamu_di_sini"
```

---

## Cara Menggunakan

1. Buat file `.json` berisi payload pesan kamu (lihat contoh di bawah).
2. Kirim pesan menggunakan perintah CLI:

```bash
# Kirim payload dari file JSON
neo-baileys send --payload ./payload.json

# Kirim dengan menentukan target ID secara langsung
neo-baileys send --to "id_kontak_tujuan" --payload ./payload.json
```

---

## Contoh Payload Pesan

Simpan masing-masing payload berikut ke dalam file `.json` terpisah sesuai kebutuhan.

### 1. Tombol Interaktif (`buttons.json`)
Kirim pesan dengan tombol aksi cepat (*quick reply*) atau tautan link luar (*Call To Action*):

```json
{
  "toId": "id_kontak_tujuan",
  "text": "Pilih menu di bawah:",
  "interactive": {
    "kind": "buttons",
    "text": "Silakan pilih:",
    "buttons": [
      {
        "type": "reply",
        "id": "btn1",
        "text": "Katalog",
        "icon": "fa-store"
      },
      {
        "type": "cta",
        "text": "Chat Admin",
        "url": "https://wa.me/628xxx",
        "icon": "fa-whatsapp"
      }
    ]
  }
}
```

*Cara kirim:*
```bash
neo-baileys send --payload ./buttons.json
```

---

### 2. Pesan Rich HTML (`rich.json`)
Kirim tampilan kartu interaktif berbasis HTML/CSS dengan event trigger:

```json
{
  "toId": "id_kontak_tujuan",
  "rich": {
    "html": "<div style='padding:16px;background:#1e293b;border-radius:12px;color:#fff;text-align:center'><h2 style='margin:0 0 10px'>Promo Spesial</h2><p style='color:#94a3b8;margin:0 0 14px'>Diskon 50% khusus hari ini</p><button style='padding:10px 18px;background:#22c55e;border:none;border-radius:8px;color:#fff;font-weight:bold;cursor:pointer' onclick='window.parent.postMessage({type:\"rich-event\",event:\"klaim\"},\"*\")'>Klaim Sekarang</button></div>",
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

*Cara kirim:*
```bash
neo-baileys send --payload ./rich.json
```

---

### 3. Daftar Pilihan List (`list.json`)
Kirim daftar menu berjenjang dengan kategori dan deskripsi harga:

```json
{
  "toId": "id_kontak_tujuan",
  "interactive": {
    "kind": "list",
    "title": "Menu Utama",
    "text": "Pilih kategori:",
    "triggerText": "Lihat Kategori",
    "sections": [
      {
        "title": "Makanan",
        "rows": [
          {
            "id": "nasi",
            "title": "Nasi Goreng",
            "description": "Rp 15.000"
          },
          {
            "id": "mie",
            "title": "Mie Ayam",
            "description": "Rp 12.000"
          }
        ]
      }
    ]
  }
}
```

*Cara kirim:*
```bash
neo-baileys send --payload ./list.json
```

---

### 4. Pesan Media Gambar (`media.json`)
Kirim gambar langsung menggunakan format data URI Base64:

```json
{
  "toId": "id_kontak_tujuan",
  "text": "Lihat foto ini:",
  "media": {
    "type": "image",
    "data": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD..."
  }
}
```

*Cara kirim:*
```bash
neo-baileys send --payload ./media.json
```

---

## Troubleshooting

| Kendala | Penyebab | Solusi |
| :--- | :--- | :--- |
| `Unauthorized / 401` | Device token salah atau expired | Hubungkan ulang perangkat di aplikasi Neo Chat dan perbarui token login. |
| `User not found` | Target `toId` salah atau belum berteman | Pastikan ID target valid dan sudah terdaftar di kontak Neo Chat kamu. |
| `Invalid JSON Payload` | Format sintaks JSON salah (koma, tanda kutip) | Periksa file JSON kamu menggunakan JSON validator online. |

---

## Lisensi

Didistribusikan di bawah lisensi [MIT](LICENSE).
