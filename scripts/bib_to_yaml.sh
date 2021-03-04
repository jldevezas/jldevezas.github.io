#!/bin/bash

if [ $# -lt 2 ]
then
    echo "Usage: $0 SOURCE.bib TARGET.yaml"
    exit 1
fi

bib_path=$1
yaml_path=$2

echo "==> Converting BibTeX in $bib_path to YAML at $yaml_path"
pandoc-citeproc -y "$bib_path" > "$yaml_path"
echo "==> Done"