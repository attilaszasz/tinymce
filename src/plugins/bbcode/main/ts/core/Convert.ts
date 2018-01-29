/**
 * Convert.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

import Tools from 'tinymce/core/api/util/Tools';

const html2bbcode = function (s) {
  s = Tools.trim(s);

  const rep = function (re, str) {
    s = s.replace(re, str);
  };

  // example: <strong> to [b]
  rep(/<a.*?href=\"(.*?)\".*?>(.*?)<\/a>/gi, '[url=$1]$2[/url]');
  rep(/<font.*?color=\"(.*?)\".*?class=\"codeStyle\".*?>(.*?)<\/font>/gi, '[code][color=$1]$2[/color][/code]');
  rep(/<font.*?color=\"(.*?)\".*?class=\"quoteStyle\".*?>(.*?)<\/font>/gi, '[quote][color=$1]$2[/color][/quote]');
  rep(/<font.*?class=\"codeStyle\".*?color=\"(.*?)\".*?>(.*?)<\/font>/gi, '[code][color=$1]$2[/color][/code]');
  rep(/<font.*?class=\"quoteStyle\".*?color=\"(.*?)\".*?>(.*?)<\/font>/gi, '[quote][color=$1]$2[/color][/quote]');
  rep(/<span style=\"color: ?(.*?);\">(.*?)<\/span>/gi, '[color=$1]$2[/color]');
  rep(/<font.*?color=\"(.*?)\".*?>(.*?)<\/font>/gi, '[color=$1]$2[/color]');
  rep(/<span style=\"font-size:(.*?);\">(.*?)<\/span>/gi, '[size=$1]$2[/size]');
  rep(/<p style=\"text-align: center;\">(.*?)<\/p>/gi, '[center]$1[/center]');
  rep(/<p style=\"text-align: center;\">(.*?)\n/gi, '[center]$1[/center]\n');
  rep(/<p style=\"text-align: center;\">(.*?)\Z/gi, '[center]$1[/center]');
  rep(/<p style=\"text-align: left;\">(.*?)<\/p>/gi, '[left]$1[/left]');
  rep(/<p style=\"text-align: left;\">(.*?)\n/gi, '[left]$1[/left]\n');
  rep(/<p style=\"text-align: left;\">(.*?)\Z/gi, '[left]$1[/left]');
  rep(/<p style=\"text-align: right;\">(.*?)<\/p>/gi, '[right]$1[/right]');
  rep(/<p style=\"text-align: right;\">(.*?)\n/gi, '[right]$1[/right]\n');
  rep(/<p style=\"text-align: right;\">(.*?)\Z/gi, '[right]$1[/right]');
  rep(/<font>(.*?)<\/font>/gi, '$1');
  rep(/<img.*?src=\"(.*?)\".*?\/>/gi, '[img]$1[/img]');
  rep(/<pre>(.*?)<\/pre>/gi, '[code]$1[/code]');
  rep(/<span class=\"codeStyle\">(.*?)<\/span>/gi, '[code]$1[/code]');
  rep(/<span class=\"quoteStyle\">(.*?)<\/span>/gi, '[quote]$1[/quote]');
  rep(/<strong class=\"codeStyle\">(.*?)<\/strong>/gi, '[code][b]$1[/b][/code]');
  rep(/<strong class=\"quoteStyle\">(.*?)<\/strong>/gi, '[quote][b]$1[/b][/quote]');
  rep(/<em class=\"codeStyle\">(.*?)<\/em>/gi, '[code][i]$1[/i][/code]');
  rep(/<em class=\"quoteStyle\">(.*?)<\/em>/gi, '[quote][i]$1[/i][/quote]');
  rep(/<u class=\"codeStyle\">(.*?)<\/u>/gi, '[code][u]$1[/u][/code]');
  rep(/<u class=\"quoteStyle\">(.*?)<\/u>/gi, '[quote][u]$1[/u][/quote]');

  rep(/<h1 style=\"text-align: center;\">(.*?)<\/h1>/gi, '[center][size=30]$1[/size][/center]');
  rep(/<h2 style=\"text-align: center;\">(.*?)<\/h2>/gi, '[center][size=26]$1[/size][/center]');
  rep(/<h3 style=\"text-align: center;\">(.*?)<\/h3>/gi, '[center][size=22]$1[/size][/center]');
  rep(/<h4 style=\"text-align: center;\">(.*?)<\/h4>/gi, '[center][size=18]$1[/size][/center]');
  rep(/<h5 style=\"text-align: center;\">(.*?)<\/h5>/gi, '[center][size=14]$1[/size][/center]');
  rep(/<h6 style=\"text-align: center;\">(.*?)<\/h6>/gi, '[center][size=10]$1[/size][/center]');

  rep(/<h1 style=\"text-align: left;\">(.*?)<\/h1>/gi, '[left][size=30]$1[/size][/left]');
  rep(/<h2 style=\"text-align: left;\">(.*?)<\/h2>/gi, '[left][size=26]$1[/size][/left]');
  rep(/<h3 style=\"text-align: left;\">(.*?)<\/h3>/gi, '[left][size=22]$1[/size][/left]');
  rep(/<h4 style=\"text-align: left;\">(.*?)<\/h4>/gi, '[left][size=18]$1[/size][/left]');
  rep(/<h5 style=\"text-align: left;\">(.*?)<\/h5>/gi, '[left][size=14]$1[/size][/left]');
  rep(/<h6 style=\"text-align: left;\">(.*?)<\/h6>/gi, '[left][size=10]$1[/size][/left]');

  rep(/<h1 style=\"text-align: right;\">(.*?)<\/h1>/gi, '[right][size=30]$1[/size][/right]');
  rep(/<h2 style=\"text-align: right;\">(.*?)<\/h2>/gi, '[right][size=26]$1[/size][/right]');
  rep(/<h3 style=\"text-align: right;\">(.*?)<\/h3>/gi, '[right][size=22]$1[/size][/right]');
  rep(/<h4 style=\"text-align: right;\">(.*?)<\/h4>/gi, '[right][size=18]$1[/size][/right]');
  rep(/<h5 style=\"text-align: right;\">(.*?)<\/h5>/gi, '[right][size=14]$1[/size][/right]');
  rep(/<h6 style=\"text-align: right;\">(.*?)<\/h6>/gi, '[right][size=10]$1[/size][/right]');

  rep(/<h1>(.*?)<\/h1>/gi, '[size=30]$1[/size]');
  rep(/<h2>(.*?)<\/h2>/gi, '[size=26]$1[/size]');
  rep(/<h3>(.*?)<\/h3>/gi, '[size=22]$1[/size]');
  rep(/<h4>(.*?)<\/h4>/gi, '[size=18]$1[/size]');
  rep(/<h5>(.*?)<\/h5>/gi, '[size=14]$1[/size]');
  rep(/<h6>(.*?)<\/h6>/gi, '[size=10]$1[/size]');

  rep(/<\/(strong|b)>/gi, '[/b]');
  rep(/<(strong|b)>/gi, '[b]');
  rep(/<\/(em|i)>/gi, '[/i]');
  rep(/<(em|i)>/gi, '[i]');
  rep(/<\/u>/gi, '[/u]');
  rep(/<span style=\"text-decoration: ?underline;\">(.*?)<\/span>/gi, '[u]$1[/u]');
  rep(/<u>/gi, '[u]');
  rep(/<blockquote[^>]*>/gi, '[quote]');
  rep(/<\/blockquote>/gi, '[/quote]');
  rep(/<br \/>/gi, '\n');
  rep(/<br\/>/gi, '\n');
  rep(/<br>/gi, '\n');
  rep(/<p>/gi, '');
  rep(/<\/p>/gi, '\n');
  rep(/<h1>/gi, '[size=30]');
  rep(/<h2>/gi, '[size=26]');
  rep(/<h3>/gi, '[size=22]');
  rep(/<h4>/gi, '[size=18]');
  rep(/<h5>/gi, '[size=14]');
  rep(/<h6>/gi, '[size=10]');
  rep(/<\/h1>/gi, '[/size]');
  rep(/<\/h2>/gi, '[/size]');
  rep(/<\/h3>/gi, '[/size]');
  rep(/<\/h4>/gi, '[/size]');
  rep(/<\/h5>/gi, '[/size]');
  rep(/<\/h6>/gi, '[/size]');
  rep(/&nbsp;|\u00a0/gi, ' ');
  rep(/&quot;/gi, '"');
  rep(/&lt;/gi, '<');
  rep(/&gt;/gi, '>');
  rep(/&amp;/gi, '&');

  return s;
};

const bbcode2html = function (s) {
  s = Tools.trim(s);

  const rep = function (re, str) {
    s = s.replace(re, str);
  };

  // example: [b] to <strong>
  rep(/\n/gi, '<br />');
  rep(/\[b\]/gi, '<strong>');
  rep(/\[\/b\]/gi, '</strong>');
  rep(/\[i\]/gi, '<em>');
  rep(/\[\/i\]/gi, '</em>');
  rep(/\[u\]/gi, '<u>');
  rep(/\[\/u\]/gi, '</u>');
  rep(/\[url=([^\]]+)\](.*?)\[\/url\]/gi, '<a href="$1">$2</a>');
  rep(/\[url\](.*?)\[\/url\]/gi, '<a href="$1">$1</a>');
  rep(/\[img\](.*?)\[\/img\]/gi, '<img src="$1" />');
  rep(/\[color=(.*?)\](.*?)\[\/color\]/gi, '<font color="$1">$2</font>');
  rep(/\[code\](.*?)\[\/code\]/gi, '<span class="codeStyle">$1</span>&nbsp;');

  rep(/\[center\]\[size=30\](.*?)\[\/size\]\[\/center\]/gi, '<h1 style="text-align: center;">$1</h1>');
  rep(/\[center\]\[size=26\](.*?)\[\/size\]\[\/center\]/gi, '<h2 style="text-align: center;">$1</h2>');
  rep(/\[center\]\[size=22\](.*?)\[\/size\]\[\/center\]/gi, '<h3 style="text-align: center;">$1</h3>');
  rep(/\[center\]\[size=18\](.*?)\[\/size\]\[\/center\]/gi, '<h4 style="text-align: center;">$1</h4>');
  rep(/\[center\]\[size=14\](.*?)\[\/size\]\[\/center\]/gi, '<h5 style="text-align: center;">$1</h5>');
  rep(/\[center\]\[size=10\](.*?)\[\/size\]\[\/center\]/gi, '<h6 style="text-align: center;">$1</h6>');

  rep(/\[left\]\[size=30\](.*?)\[\/size\]\[\/left\]/gi, '<h1 style="text-align: left;">$1</h1>');
  rep(/\[left\]\[size=26\](.*?)\[\/size\]\[\/left\]/gi, '<h2 style="text-align: left;">$1</h2>');
  rep(/\[left\]\[size=22\](.*?)\[\/size\]\[\/left\]/gi, '<h3 style="text-align: left;">$1</h3>');
  rep(/\[left\]\[size=18\](.*?)\[\/size\]\[\/left\]/gi, '<h4 style="text-align: left;">$1</h4>');
  rep(/\[left\]\[size=14\](.*?)\[\/size\]\[\/left\]/gi, '<h5 style="text-align: left;">$1</h5>');
  rep(/\[left\]\[size=10\](.*?)\[\/size\]\[\/left\]/gi, '<h6 style="text-align: left;">$1</h6>');

  rep(/\[center\]\[size=30\](.*?)\[\/size\]\[\/center\]/gi, '<h1 style="text-align: right;">$1</h1>');
  rep(/\[center\]\[size=26\](.*?)\[\/size\]\[\/center\]/gi, '<h2 style="text-align: right;">$1</h2>');
  rep(/\[center\]\[size=22\](.*?)\[\/size\]\[\/center\]/gi, '<h3 style="text-align: right;">$1</h3>');
  rep(/\[center\]\[size=18\](.*?)\[\/size\]\[\/center\]/gi, '<h4 style="text-align: right;">$1</h4>');
  rep(/\[center\]\[size=14\](.*?)\[\/size\]\[\/center\]/gi, '<h5 style="text-align: right;">$1</h5>');
  rep(/\[center\]\[size=10\](.*?)\[\/size\]\[\/center\]/gi, '<h6 style="text-align: right;">$1</h6>');

  rep(/\[center\](.*?)\[\/center\]/gi, '<p style="text-align: center;">$1</p>');
  rep(/\[left\](.*?)\[\/left\]/gi, '<p style="text-align: left;">$1</p>');
  rep(/\[right\](.*?)\[\/right\]/gi, '<p style="text-align: right;">$1</p>');
  rep(/\[quote.*?\](.*?)\[\/quote\]/gi, '<span class="quoteStyle">$1</span>&nbsp;');
  rep(/\[size=30\](.*?)\[\/size\]/gi, '<h1>$1</h1>');
  rep(/\[size=26\](.*?)\[\/size\]/gi, '<h2>$1</h2>');
  rep(/\[size=22\](.*?)\[\/size\]/gi, '<h3>$1</h3>');
  rep(/\[size=18\](.*?)\[\/size\]/gi, '<h4>$1</h4>');
  rep(/\[size=14\](.*?)\[\/size\]/gi, '<h5>$1</h5>');
  rep(/\[size=10\](.*?)\[\/size\]/gi, '<h6>$1</h6>');
  return s;
};

export default {
  html2bbcode,
  bbcode2html
};