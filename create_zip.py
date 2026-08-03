#!/usr/bin/env python3
"""
create_zip.py
Packages the AURA-SIP Next.js project into aura-sip-project.zip,
excluding build artifacts and dependency folders.
"""

import os
import zipfile

ROOT = os.path.dirname(os.path.abspath(__file__))
OUTPUT_ZIP = os.path.join(ROOT, "aura-sip-project.zip")

EXCLUDE_DIRS = {"node_modules", ".next", "out", "build", ".git"}
EXCLUDE_FILES = {".DS_Store", "aura-sip-project.zip"}


def should_skip_dir(dirname: str) -> bool:
    return dirname in EXCLUDE_DIRS


def main():
    if os.path.exists(OUTPUT_ZIP):
        os.remove(OUTPUT_ZIP)

    file_count = 0
    with zipfile.ZipFile(OUTPUT_ZIP, "w", zipfile.ZIP_DEFLATED) as zf:
        for current_dir, dirnames, filenames in os.walk(ROOT):
            dirnames[:] = [d for d in dirnames if not should_skip_dir(d)]

            for filename in filenames:
                if filename in EXCLUDE_FILES:
                    continue
                full_path = os.path.join(current_dir, filename)
                arcname = os.path.join(
                    "aura-sip-project",
                    os.path.relpath(full_path, ROOT),
                )
                zf.write(full_path, arcname)
                file_count += 1

    print(f"Packed {file_count} files into {OUTPUT_ZIP}")


if __name__ == "__main__":
    main()
