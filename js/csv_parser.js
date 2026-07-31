/**
 * D&D 5e Nexus - CSV Parser & Converter Engine
 * Provides robust CSV parsing (handling quoted text with line breaks) and CSV formatting.
 */
window.DnDNexus = window.DnDNexus || {};

(function() {
  /**
   * Parses a CSV string into an array of Objects based on the header row.
   * Handles quoted fields, embedded commas, quotes, and newlines.
   */
  window.DnDNexus.parseCSV = function(csvText) {
    if (!csvText || typeof csvText !== 'string') return [];

    // Remove BOM if present
    if (csvText.charCodeAt(0) === 0xFEFF) {
      csvText = csvText.slice(1);
    }

    const rows = [];
    let currentRow = [];
    let currentCell = '';
    let insideQuote = false;

    for (let i = 0; i < csvText.length; i++) {
      const char = csvText[i];
      const nextChar = csvText[i + 1];

      if (insideQuote) {
        if (char === '"') {
          if (nextChar === '"') {
            // Escaped quote ("")
            currentCell += '"';
            i++;
          } else {
            // Closing quote
            insideQuote = false;
          }
        } else {
          currentCell += char;
        }
      } else {
        if (char === '"') {
          insideQuote = true;
        } else if (char === ',') {
          currentRow.push(currentCell.trim());
          currentCell = '';
        } else if (char === '\r') {
          // Skip CR, handle LF
          if (nextChar === '\n') {
            i++;
          }
          currentRow.push(currentCell.trim());
          rows.push(currentRow);
          currentRow = [];
          currentCell = '';
        } else if (char === '\n') {
          currentRow.push(currentCell.trim());
          rows.push(currentRow);
          currentRow = [];
          currentCell = '';
        } else {
          currentCell += char;
        }
      }
    }

    if (currentCell.length > 0 || currentRow.length > 0) {
      currentRow.push(currentCell.trim());
      rows.push(currentRow);
    }

    if (rows.length < 2) return [];

    const headers = rows[0].map(h => h.replace(/^["']|["']$/g, '').trim());
    const feats = [];

    for (let r = 1; r < rows.length; r++) {
      const row = rows[r];
      if (row.length === 0 || (row.length === 1 && !row[0])) continue;

      const obj = {};
      headers.forEach((h, colIdx) => {
        let val = row[colIdx] || '';
        if (h === 'asiOptions') {
          // Parse comma separated asi values
          obj[h] = val ? val.split(',').map(s => s.trim().toLowerCase()).filter(Boolean) : [];
        } else {
          obj[h] = val;
        }
      });

      if (!obj.id && obj.name) {
        obj.id = obj.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      }

      if (obj.name) {
        feats.push(obj);
      }
    }

    return feats;
  };

  /**
   * Converts an array of feat objects into a clean CSV string format
   */
  window.DnDNexus.exportFeatsToCSV = function(featsArray) {
    if (!Array.isArray(featsArray)) return '';

    const headers = ["id", "name", "category", "prerequisite", "asiOptions", "description", "fullDetails"];
    const lines = [headers.join(",")];

    featsArray.forEach(feat => {
      const row = headers.map(header => {
        let val = feat[header];
        if (header === 'asiOptions') {
          val = Array.isArray(val) ? val.join(',') : (val || '');
        } else {
          val = (val || '').toString();
        }

        // Escape quotes by doubling them
        val = val.replace(/"/g, '""');

        // Wrap in quotes if it contains commas, quotes, or newlines
        if (val.includes(',') || val.includes('"') || val.includes('\n') || val.includes('\r')) {
          val = `"${val}"`;
        }
        return val;
      });
      lines.push(row.join(","));
    });

    return lines.join("\r\n");
  };
})();
