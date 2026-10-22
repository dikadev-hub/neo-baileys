#!/usr/bin/env node
const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const axios = require('axios');
const chokidar = require('chokidar');

console.log(chalk.green.bold("\nNeo Baileys CLI v1.0.0\n"));

const configPath = path.join(process.cwd(), 'neo-config.json');
const templateDir = path.join(process.cwd(), 'templates');

if (!fs.existsSync(templateDir)) {
  fs.mkdirSync(templateDir, { recursive: true });
  fs.writeFileSync(path.join(templateDir, 'wa.json'), JSON.stringify({
    trigger: "/menu",
    toId: "GANTI_DENGAN_ID",
    text: "Pilih menu:",
    interactive: {
      kind: "buttons",
      text: "Silakan pilih:",
      buttons: [
        { type: "reply", id: "btn1", text: "Katalog", icon: "fa-store" },
        { type: "cta", text: "Admin", url: "https://wa.me/628xxx", icon: "fa-whatsapp" }
      ]
    }
  }, null, 2));
  console.log(chalk.yellow("Folder templates/ dan wa.json dibuat."));
}

async function setup() {
  let config = {};
  if (fs.existsSync(configPath)) {
    config = JSON.parse(fs.readFileSync(configPath));
  }

  const answers = await inquirer.prompt([
    { 
      type: 'input', 
      name: 'url', 
      message: 'URL Neo Chat:', 
      default: config.url || 'https://domainmu.com' 
    },
    { 
      type: 'input', 
      name: 'token', 
      message: 'Device Token:', 
      default: config.token || '' 
    }
  ]);

  fs.writeFileSync(configPath, JSON.stringify(answers, null, 2));
  console.log(chalk.green("Config disimpan."));
  return answers;
}

async function executeTemplate(config, filePath) {
  try {
    const rawData = fs.readFileSync(filePath, 'utf8');
    const template = JSON.parse(rawData);

    if (!template.toId || template.toId === "GANTI_DENGAN_ID") {
      console.log(chalk.red(`[SKIP] ${path.basename(filePath)}: toId belum diisi.`));
      return;
    }

    console.log(chalk.blue(`\nMengirim: ${path.basename(filePath)}...`));

    const payload = {
      toId: template.toId,
      text: template.text || "",
      interactive: template.interactive || null,
      rich: template.rich || null,
      media: template.media || null,
      hideBotLabel: false
    };

    const res = await axios.post(`${config.url}/api/bot/send`, payload, {
      headers: { 
        Authorization: `Bearer ${config.token}`,
        "Content-Type": "application/json"
      }
    });

    if (res.data && res.data.ok) {
      console.log(chalk.green(`Sukses terkirim ke: ${template.toId}`));
    } else {
      console.log(chalk.red(`Gagal: ${res.data.message || 'Unknown'}`));
    }
  } catch (err) {
    if (err.response) {
      console.log(chalk.red(`Error API: ${err.response.data.message || err.response.status}`));
    } else {
      console.log(chalk.red(`Error Koneksi: ${err.message}`));
    }
  }
}

(async () => {
  const config = await setup();
  
  console.log(chalk.cyan("\nMemantau folder templates/..."));
  console.log(chalk.gray("Edit file JSON untuk mengirim tombol.\n"));

  const watcher = chokidar.watch(path.join(templateDir, '*.json'));
  
  watcher.on('add', (file) => {
    console.log(chalk.gray(`[Baru] ${path.basename(file)}`));
    executeTemplate(config, file);
  });
  
  watcher.on('change', (file) => {
    console.log(chalk.yellow(`\n[Edit] ${path.basename(file)}`));
    executeTemplate(config, file);
  });
})();
