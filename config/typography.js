const theme = require('./theme')

module.exports = {
  includeNormalize: true,
  headerFontFamily: [`Vollkorn`, `sans-serif`],
  bodyFontFamily: [`Open Sans`, `sans-serif`],
  headerWeight: 400,
  blockMarginBottom: 0.6,
  baseLineHeight: 1.42,
  baseFontSize: `18px`,
  headerLineHeight: 1.05,
  scaleRatio: 2.6,
  overrideStyles: typography => {
    return {
      'h1,h2,h3,h4,h5,h6': {
        color: theme.primary
      },
      a: {
        textDecoration: `none`,
        color: theme.linkColor
      },
      'h1,h2': {
        // color: 'inherit',
        lineHeight: typography.rhythm(2),
        marginTop: typography.rhythm(2),
        marginBottom: typography.rhythm(1)
      },
      h3: {
        lineHeight: typography.rhythm(2),
        marginTop: typography.rhythm(1),
        marginBottom: typography.rhythm(1)
      }
    }
  }
}
