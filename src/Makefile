BIBTEX_FILES=\
	static/bib/chapters.bib \
	static/bib/conferences.bib \
	static/bib/magazines.bib \
	static/bib/datasets.bib \
	static/bib/journals.bib \
	static/bib/reports.bib \
	static/bib/theses.bib \
	static/bib/unpublished.bib

all:
	hugo

dev:
	hugo server -D -b localhost:1313

setup:
	git submodule update --init --recursive

deploy:
	git subtree push --prefix public/ origin gh-pages

bib:
	@for bib_path in $(BIBTEX_FILES); \
	do \
		json_path=data/academy/publications/$$(basename $${bib_path%.*}).json; \
		echo "==> $$bib_path -> $$json_path"; \
		pandoc -f bibtex -t csljson "$$bib_path" -o "$$json_path"; \
	done

clean:
	find -name "*.sav" -delete -or -name "*.bak" -delete
	find -name "*Zone.Identifier" -delete
