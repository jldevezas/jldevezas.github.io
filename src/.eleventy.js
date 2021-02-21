module.exports = function (eleventyConfig) {
	eleventyConfig.setTemplateFormats(['md', 'liquid', 'css']);

  eleventyConfig.addPassthroughCopy('css/*.css')

	eleventyConfig.addPassthroughCopy({
		'node_modules/spectre.css/dist/spectre.min.css': 'css/spectre.min.css'
	})
};