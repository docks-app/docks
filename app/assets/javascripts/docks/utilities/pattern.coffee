pattern = window.pattern
delete window.pattern

result_types = [
  "markup"
  "style"
  "script"
]

Pattern =
  for: (symbol, options = {}) ->
    symbol = symbol.split(/\s+/)

    for result_type in result_types
      for result in pattern[result_type]
        # TODO: fix the item thing
        return result.item if result.item.name in symbol

        if options.search_subcomponents
          if subcomponents = result.item.subcomponents
            for subcomponent in subcomponents
              return subcomponent if subcomponent.name in symbol

    return


window.Docks.Pattern = Pattern
