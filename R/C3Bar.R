#' <Add Title>
#'
#' <Add Description>
#'
#' @import htmlwidgets
#'
#' @export
C3Bar <-   function(dataset,
                    legendPosition = "bottom",
                    groupedToolTip = FALSE,
                    legendPadding = 20,
                    legendTileWidth = 10,
                    legendTileHeight = 10,
                    chartPaddingBottom = 10,
                    width = NULL, height = NULL) {

  # forward options using x
  x = list(
    dataset = dataset,
    legendPosition = legendPosition,
    groupedToolTip = groupedToolTip,
    legendPadding = legendPadding,
    legendTileWidth = legendTileWidth,
    legendTileHeight = legendTileHeight,
    chartPaddingBottom = chartPaddingBottom
  )

  # create widget
  htmlwidgets::createWidget(
    name = 'C3Bar',
    x,
    width = width,
    height = height,
    package = 'C3'
  )
}

#' Shiny bindings for C3Bar
#'
#' Output and render functions for using C3Bar within Shiny
#' applications and interactive Rmd documents.
#'
#' @param outputId output variable to read from
#' @param width,height Must be a valid CSS unit (like \code{'100\%'},
#'   \code{'400px'}, \code{'auto'}) or a number, which will be coerced to a
#'   string and have \code{'px'} appended.
#' @param expr An expression that generates a C3Bar
#' @param env The environment in which to evaluate \code{expr}.
#' @param quoted Is \code{expr} a quoted expression (with \code{quote()})? This
#'   is useful if you want to save an expression in a variable.
#'
#' @name C3Bar-shiny
#'
#' @export
C3BarOutput <- function(outputId, width = '100%', height = '400px'){
  htmlwidgets::shinyWidgetOutput(outputId, 'C3Bar', width, height, package = 'C3')
}

#' @rdname C3Bar-shiny
#' @export
renderC3Bar <- function(expr, env = parent.frame(), quoted = FALSE) {
  if (!quoted) { expr <- substitute(expr) } # force quoted
  htmlwidgets::shinyRenderWidget(expr, C3BarOutput, env, quoted = TRUE)
}
