# Subscript

Basic subscript

```````````````````````````````` example
~foo~
.
<p><sub>foo</sub></p>
````````````````````````````````

Nested subscript

```````````````````````````````` example
2 ~2 ~2~~
.
<p>2 <sub>2 <sub>2</sub></sub></p>
````````````````````````````````

Accidental subscript

```````````````````````````````` example
Emoji accidentally becomes subscript ~_~
.
<p>Emoji accidentally becomes subscript <sub>_</sub></p>
````````````````````````````````

Spaces allowed

```````````````````````````````` example
Spaces ~are allowed~
.
<p>Spaces <sub>are allowed</sub></p>
````````````````````````````````

Escape to not have subscripts

```````````````````````````````` example
Escape \~to avoid subscripts\~
.
<p>Escape ~to avoid subscripts~</p>
````````````````````````````````

Empty subscripts are not allowed

```````````````````````````````` example
Not a subscript ~~
.
<p>Not a subscript ~~</p>
````````````````````````````````

Tildes must be escaped in subscripts

```````````````````````````````` example
Tilde in subscript ~\~~
.
<p>Tilde in subscript <sub>~</sub></p>
````````````````````````````````
