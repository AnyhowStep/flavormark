# Tex Block

Basic tex block, all dollar symbols are automatically escaped in the output

```````````````````````````````` example
$$ foo $ bar  $$
.
<span class="math display">\[ foo \$ bar  \]</span>
````````````````````````````````

Newlines are preserved

```````````````````````````````` example
$$
foo
$$
.
<span class="math display">\[
foo
\]</span>
````````````````````````````````

Without a matching closing delimiter, the rest of the text is math.

```````````````````````````````` example
$$$foo$$
.
<span class="math display">\[foo\$\$
\]</span>
````````````````````````````````

All internal dollar symbols are automatically escaped

```````````````````````````````` example
$$
$$$ unescaped
foo
\$\$\$ escaped
$\$$ mixed
\$$\$ mixed
\$\$$ mixed
$\$\$ mixed
$$
.
<span class="math display">\[
\$\$\$ unescaped
foo
\$\$\$ escaped
\$\$\$ mixed
\$\$\$ mixed
\$\$\$ mixed
\$\$\$ mixed
\]</span>
````````````````````````````````

A slight variation of the above

```````````````````````````````` example
$$ $$$ unescaped
foo
\$\$\$ escaped
$\$$ mixed
\$$\$ mixed
\$\$$ mixed
$\$\$ mixed
$$
.
<span class="math display">\[ \$\$\$ unescaped
foo
\$\$\$ escaped
\$\$\$ mixed
\$\$\$ mixed
\$\$\$ mixed
\$\$\$ mixed
\]</span>
````````````````````````````````

Empty Tex Block

```````````````````````````````` example
$$$$
.
<span class="math display">\[
\]</span>
````````````````````````````````

Whitespace Tex Block

```````````````````````````````` example
$$ $$
.
<span class="math display">\[ \]</span>
````````````````````````````````

Empty Tex Block

```````````````````````````````` example
$$$$$$
.
<span class="math display">\[
\]</span>
````````````````````````````````

Dollar in Tex Block

```````````````````````````````` example
$$ $ $$
.
<span class="math display">\[ \$ \]</span>
````````````````````````````````

Empty Tex Block

```````````````````````````````` example
$$$$$
.
<span class="math display">\[
\]</span>
````````````````````````````````

Unexpected

```````````````````````````````` example
$$\$$$
.
<span class="math display">\[\$\$\$
\]</span>
````````````````````````````````

Tex Span in a blockquote

```````````````````````````````` example
> $$ x + y = 10 $$

$$ x + y = 10 $$
.
<blockquote>
<span class="math display">\[ x + y = 10 \]</span>
</blockquote>
<span class="math display">\[ x + y = 10 \]</span>
````````````````````````````````

Tex Span in a blockquote

```````````````````````````````` example
> $$ x +
> y = 10 $$

$$ x +
y = 10 $$
.
<blockquote>
<span class="math display">\[ x +
y = 10 \]</span>
</blockquote>
<span class="math display">\[ x +
y = 10 \]</span>
````````````````````````````````

Tex Span in a list item

```````````````````````````````` example
- $$ x + y = 10 $$

$$ x + y = 10 $$
.
<ul>
<li><span class="math display">\[ x + y = 10 \]</span>
</li>
</ul>
<span class="math display">\[ x + y = 10 \]</span>
````````````````````````````````


Tex Span in a list item

```````````````````````````````` example
- $$ x +
  y = 10 $$

$$ x +
y = 10 $$
.
<ul>
<li><span class="math display">\[ x +
y = 10 \]</span>
</li>
</ul>
<span class="math display">\[ x +
y = 10 \]</span>
````````````````````````````````
