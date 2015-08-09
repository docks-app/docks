import query_string from "~vendor/query_string";

var QueryString, location, query;

location = () => { return window.location; };
query = () => { return query_string.parse(location().search); };

QueryString = {
  get(key) {
    return query()[key];
  },

  set(key, value) {
    var current_query = query(),
        new_url;

    current_query[key] = value;
    new_url = `${location.protocol}//${location.host}${location.pathname}?${query_string.stringify(query)}`;
    window.history.replaceState({ path: new_url }, document.title, new_url);
    return current_query;
  }
};

export default QueryString;
