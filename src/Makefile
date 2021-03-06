SCRIPTS_DIR=../scripts

BIBTEX_FILES=\
	static/bib/chapters.bib \
	static/bib/conferences.bib \
	static/bib/datasets.bib \
	static/bib/journals.bib \
	static/bib/reports.bib \
	static/bib/theses.bib \
	static/bib/unpublished.bib

all:
	hugo

bib:
	@for file in $(BIBTEX_FILES); \
	do \
		$(SCRIPTS_DIR)/bib_to_yaml.sh $$file data/academy/publications/$$(basename $${file%.*}).yaml; \
	done

clean:
	find -name "*.sav" -delete -or -name "*.bak" -delete
	find -name "*Zone.Identifier" -delete
