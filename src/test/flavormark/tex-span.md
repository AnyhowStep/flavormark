# Tex Span

This is a simple tex span:

```````````````````````````````` example
$foo$
.
<p><span class="math inline">\(foo\)</span></p>
````````````````````````````````

This is two tex spans

```````````````````````````````` example
$ $$ $
.
<p><span class="math inline">\(\)</span><span class="math inline">\(\)</span></p>
````````````````````````````````

Interior spaces and [line endings] are collapsed into
single spaces, just as they would be by a browser:

```````````````````````````````` example
$foo   bar
  baz$
.
<p><span class="math inline">\(foo bar baz\)</span></p>
````````````````````````````````

Not all [Unispan whitespace] (for instance, non-breaking space) is
collapsed, however:

```````````````````````````````` example
$a  b$
.
<p><span class="math inline">\(a  b\)</span></p>
````````````````````````````````

Two tex spans

```````````````````````````````` example
$foo $$ bar$
.
<p><span class="math inline">\(foo\)</span><span class="math inline">\(bar\)</span></p>
````````````````````````````````


```````````````````````````````` example
$foo\$bar$
.
<p><span class="math inline">\(foo\$bar\)</span></p>
````````````````````````````````



```````````````````````````````` example
*foo$*$
.
<p>*foo<span class="math inline">\(*\)</span></p>
````````````````````````````````


And this is not parsed as a link:

```````````````````````````````` example
[not a $link](/foo$)
.
<p>[not a <span class="math inline">\(link](/foo\)</span>)</p>
````````````````````````````````


tex spans, HTML tags, and autolinks have the same precedence.
Thus, this is span:

```````````````````````````````` example
$<a href="$">$
.
<p><span class="math inline">\(&lt;a href=&quot;\)</span>&quot;&gt;$</p>
````````````````````````````````


But this is an HTML tag:

```````````````````````````````` example
<a href="$">$
.
<p><a href="$">$</p>
````````````````````````````````


And this is span:

```````````````````````````````` example
$<http://foo.bar.$baz>$
.
<p><span class="math inline">\(&lt;http://foo.bar.\)</span>baz&gt;$</p>
````````````````````````````````


But this is an autolink:

```````````````````````````````` example
<http://foo.bar.$baz>$
.
<p><a href="http://foo.bar.$baz">http://foo.bar.$baz</a>$</p>
````````````````````````````````



```````````````````````````````` example
$foo
.
<p>$foo</p>
````````````````````````````````

The following case also illustrates the need for opening and
closing backtick strings to be equal in length:

```````````````````````````````` example
$foo$$bar$$
.
<p><span class="math inline">\(foo\)</span><span class="math inline">\(bar\)</span>$</p>
````````````````````````````````



Accidental Latex

```````````````````````````````` example
I have $32 and you have $64
.
<p>I have <span class="math inline">\(32 and you have\)</span>64</p>
````````````````````````````````

Escape Latex delimiters

```````````````````````````````` example
I have \$32 and you have \$64
.
<p>I have $32 and you have $64</p>
````````````````````````````````

You cannot have empty inline tex

```````````````````````````````` example
Empty tex renders as $$ dollar signs
.
<p>Empty tex renders as $$ dollar signs</p>
````````````````````````````````
