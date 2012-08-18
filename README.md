# jquery-showpassword

A jQuery (> 1.3.0) plugin that allows users to trigger the transformation of a password field into a cleartext field and vice versa from a DOM event.

_Copyright 2012 Christophe Pollet_

_Licensed under the MIT License (http://www.opensource.org/licenses/mit-license.php)_

##Demo

See example.html

## Usage

1. Link to jQuery
2. Link to showPassword
3. ```$(selector).showPassword(options);```

```$(selector)``` returns the element that triggers the switch when clicked.

## Options
```options``` are:

* **attr** [_string_] - default: _'data-showpassword-field'_<br>
Trigger's attribute where the password field's selector is stored.
* **field** [_selector_,_element_] - default: _null_<br>
The password field that showPassword reveals. If set, overrides the **attr** option.
* **clonePrefix** [_string_] - default: _'showPassword-'_<br>
The cloned element's name prefix (base name is the password field's name).
* **clonePostfix** [_string_] - default: _''_<br>
The cloned element's name postfix (base name is the password field's name).
* **after** [_function_] - default: _function(event, trigger, pwdField, txtField) {}_<br>
Function axecuted after the switch has occurred. This is a good place to stop ```event```'s proparation or to change ```trigger```'s text.
* **before** [_function_] - default: _function(event, trigger, pwdField, txtField) { return true; }_<br>
Function executed before the switch. If ```true``` is returned, the switch occurs; otherwise is is cancelled. This is a good place to ask for a confirmation.

### Example

    $(selector).showPassword({
      options1: ...,
      options2: ...,
      ...
    });

