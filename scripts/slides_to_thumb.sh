#!/bin/bash

if [ $# -lt 2 ]
then
    echo "Usage: $0 SOURCE.pdf OUTPUT_DIR"
    exit 1
fi

pdf_path=$1
pdf_dirname="$(dirname $pdf_path)"
pdf_filename="$(basename $pdf_path)"
pdf_filename_base="${pdf_filename%.*}"
pdf_filename_ext="${pdf_filename##*.}"
png_path=$2/${pdf_filename_base}.png

echo "==> Creating thumbnail for $pdf_path in $png_path"
inkscape -z -w 1000 -b white -e "$png_path" "$pdf_path" 2>/dev/null
echo "==> Done"
