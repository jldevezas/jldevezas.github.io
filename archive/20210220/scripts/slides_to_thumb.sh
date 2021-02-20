#!/bin/bash

if [ $# -lt 1 ]
then
    echo "Usage: $0 presentations/FILENAME.pdf"
    exit 1
fi

pdf_path=$1
pdf_dirname="$(dirname $pdf_path)"
pdf_filename="$(basename $pdf_path)"
pdf_filename_base="${pdf_filename%.*}"
pdf_filename_ext="${pdf_filename##*.}"
thumb_path="img/$pdf_filename_base-thumb.png"

echo "==> Creating thumbnail for $pdf_path in $thumb_path"
inkscape -z -o "$thumb_path" -w 550 "$pdf_path"
echo "==> Done"
