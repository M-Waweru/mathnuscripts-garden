require("dotenv").config();
const settings = require("../../helpers/constants");
const fs = require("fs");
const { execSync } = require("child_process");

const allSettings = settings.ALL_NOTE_SETTINGS;

function getGitDate(command) {
  try {
    const output = execSync(command, { stdio: ["ignore", "pipe", "ignore"] })
      .toString()
      .trim();
    return output || undefined;
  } catch (error) {
    return undefined;
  }
}

function getCreatedAndUpdatedDates(inputPath) {
  let createdIso;
  let updatedIso;

  if (inputPath) {
    // Try to read from git history first
    createdIso = getGitDate(
      `git log --follow --diff-filter=A --format=%aI -1 -- "${inputPath}"`
    );
    updatedIso = getGitDate(
      `git log -1 --format=%aI -- "${inputPath}"`
    );
  }

  // Fallback to filesystem stats when git data is unavailable
  if (!createdIso || !updatedIso) {
    try {
      const stats = fs.statSync(inputPath);
      const created = stats.birthtime && stats.birthtime.getTime() ? stats.birthtime : stats.ctime || stats.mtime;
      const updated = stats.mtime || stats.ctime || stats.birthtime;
      createdIso = createdIso || new Date(created).toISOString();
      updatedIso = updatedIso || new Date(updated).toISOString();
    } catch (error) {
      // Ignore if stat fails
    }
  }

  return { createdIso, updatedIso };
}

module.exports = {
  eleventyComputed: {
    layout: (data) => {
      if (data.tags.indexOf("gardenEntry") != -1) {
        return "layouts/index.njk";
      }
      return "layouts/note.njk";
    },
    permalink: (data) => {
      if (data.tags.indexOf("gardenEntry") != -1) {
        return "/";
      }
      return data.permalink || undefined;
    },
    settings: (data) => {
      const noteSettings = {};
      allSettings.forEach((setting) => {
        let noteSetting = data[setting];
        let globalSetting = process.env[setting];

        let settingValue =
          noteSetting || (globalSetting === "true" && noteSetting !== false);
        noteSettings[setting] = settingValue;
      });
      return noteSettings;
    },
    // Compute created/updated timestamps and normalize AI flags
    created: (data) => {
      if (data.created) return data.created;
      const { createdIso } = getCreatedAndUpdatedDates(data.page && data.page.inputPath);
      return createdIso;
    },
    updated: (data) => {
      if (data.updated) return data.updated;
      const { updatedIso } = getCreatedAndUpdatedDates(data.page && data.page.inputPath);
      return updatedIso || (data.page && data.page.date ? data.page.date.toISOString && data.page.date.toISOString() : undefined);
    },
    aiGenerated: (data) => {
      return data["ai-generated"] === true || data.aiGenerated === true;
    },
    aiEnhanced: (data) => {
      return data["ai-enhanced"] === true || data.aiEnhanced === true;
    },
  },
};
