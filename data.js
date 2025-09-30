function get_data() {
  return [
    {
      name: "Language Overview",
      entries: [
        {
          name: "Program Structure & Syntax",
          functions: [
            {
              name: "main function",
              sig: "fn main(pos_arg: <type>, opt_arg: ?<type>, flag: bool) { ... }",
              desc: "The entry point for every program. It can either take no arguments or have parameters that are automatically parsed from the command line. Positional arguments are mapped in order, optional arguments use the format `--name <value>`, and boolean flags use `--name`.",
              example: [
                {
                  code: 'import lib/std\n\nfn main() {\n    print("Hello, world!\\n");\n}',
                  desc: "The simplest entry point, taking no arguments."
                },
                {
                  code: '// To be run with: ./out file.txt --count 5 --verbose\nfn main(path: <char>, count: ?int, verbose: bool) {\n    print("Path: {path}\\n");\n    if let c = count {\n        print("Count: {c}\\n");\n    }\n    print("Verbose: {verbose}\\n");\n}',
                  desc: "An entry point that automatically parses command-line arguments. `path` is a required positional argument, `count` is an optional argument, and `verbose` is a boolean flag."
                },
                {
                  code: "To build and run:",
                  desc: "renc hello.re\n./out"
                }
              ],
            },
            {
              name: "import",
              sig: "import <path>",
              desc: "Imports another Ren file, bringing its public functions and types into the current namespace. The path is relative and the `.re` extension is omitted.",
              example: [
                {
                  code: '// in file: my_lib.re\npub fn say_hi() {\n    print("Hi from my_lib!\\n");\n}\n\n// in file: main.re\nimport my_lib\n\nfn main() {\n    say_hi(); // a direct call\n}',
                  desc: "Define a public function in `my_lib.re`. Import `my_lib` and call its public function directly without a namespace qualifier."
                },
                {
                  code: "To build and run:",
                  desc: "renc main.re\n./out"
                }
              ],
            },
          ],
        },
        {
          name: "Variables & Types",
          functions: [
            {
              name: "let",
              sig: "let <name> = <value>",
              desc: "Declares a variable and assigns a value. The basic types are `int`, `char`, and `bool`.",
              example: [
                {
                  code: "let my_int = 5;\nlet my_char = 'a';\nlet my_bool = true;",
                  desc: "The type is inferred."
                }
              ],
            },
            {
              name: "decl",
              sig: "decl <name>: <type>",
              desc: "Declares a variable. The memory is zeroed.",
              example: [
                {
                  code: "decl my_int: int;\ndecl my_char: char;\ndecl my_bool: bool;"
                }
              ],
            },
            {
              name: "<char> (String Slice)",
              sig: '"a string literal"',
              desc: "A string slice is an immutable view into a sequence of characters. Strings are UTF-8 encoded and support Unicode characters, either directly in the source or using escape sequences like `\"\\u{1F600}\"`. String literals create slices.",
              example: [
                {
                  code: 'let name = "Ren";\nprint(name);\n\nlet smiley = "Hello 😊 \\u{1F600}";\nprint(smiley);'
                }
              ],
            },
            {
              name: "[char] (String List)",
              sig: '+"a string literal"',
              desc: "A string list is a mutable, heap-allocated list of characters. The `+` operator copies a slice to the heap to create a list.",
              example: [
                {
                  code: 'let greeting = +"Hello";\n\npush(&greeting, \'!\');\nprint(greeting);'
                }
              ],
            },
            {
              name: "Function Pointer",
              sig: "fn(<types>) -> <return type>",
              desc: "A variable that holds a reference to a function. This allows passing functions as arguments to other functions.",
              example: [
                {
                  code: 'pub fn map<T, U>(sl: <T>, f: fn(T)->U) -> <U> {\n  let new_sl = (len(sl), alloc(len(sl) * sizeof(U))) as [U];\n  for i in 0..len(sl) {\n    new_sl[i] = f(sl[i]);\n  }\n  return new_sl;\n}',
                  desc: "Define a function that applies a function to every element in a slice. This function is taken from the std library."
                },
                {
                  code: "fn double(n: int) -> int {\n    return n * 2;\n}\n\nfn main() {\n    let numbers = [1, 2, 3, 4];\n    let doubled = map(numbers, double);\n    print(doubled); // Prints [2, 4, 6, 8]\n}",
                  desc: "Define a `double` function that matches the signature expected by `map`. You can then pass it directly as an argument."
                }
              ]
            }
          ],
        },
        {
          name: "Collections & Iteration",
          functions: [
            {
              name: "Array",
              sig: "[val1, val2, ...]",
              desc: "A fixed-size, stack-allocated collection of elements of the same type.",
              example: [
                {
                  code: "let array = [1, 2, 3];",
                  desc: "The size of an array is fixed at compile time and cannot be changed."
                }
              ],
            },
            {
              name: "List",
              sig: "+[val1, val2, ...]",
              desc: "A dynamically-sized, heap-allocated collection. Created using the `+` operator.",
              example: [
                {
                  code: "let list = +[1, 2, 3];\n\npush(&list, 4);\nprint(list[3]);",
                  desc: "Create a heap-allocated, resizable list by prefixing an array literal with `+`. Elements can be added to the list. This prints `4`."
                }
              ],
            },
            {
              name: "Slicing & Ranges",
              sig: "<collection>[start..end]",
              desc: "Creates a view into a collection using a range (`..`). Slices are iterable.",
              example: [
                {
                  code: "let arr1234 = [1, 2, 3, 4];\nlet sl23 = arr1234[1..3];",
                  desc: "Creates a slice `sl23` containing `[2, 3]`."
                },
                {
                  code: "let sl123 = arr1234[..3];",
                  desc: "Omitting the start index defaults to 0. Creates a slice `sl123` containing `[1, 2, 3]`."
                },
                {
                  code: "let sl234 = arr1234[1..];",
                  desc: "Omitting the end index defaults to the length of the collection. Creates `sl234` containing `[2, 3, 4]`."
                }
              ],
            },
            {
              name: "For Loop",
              sig: "for <var> in <iterable> { ... }",
              desc: "Iterates over any iterable type, such as a range, array, slice, list, or the result of `iter()`.",
              example: [
                {
                  code: "for i in 0..5 {\n    print(i);\n}",
                  desc: "Iterating over a range. This will print the numbers 0 through 4."
                },
                {
                  code: "let names = [\"A\", \"B\", \"C\"];\nfor name in names {\n    print(name);\n}",
                  desc: "Iterating over an array slice. This will print 'A', 'B', and 'C'."
                },
                {
                  code: "let user_data = { \"name\": \"Alex\", \"id\": 101 };\nfor field in iter(user_data) {\n    print(\"key: {field.key}, value: {field.value}\\n\");\n}",
                  desc: "Iterating over a hash map using the `iter()` function."
                },
                {
                  code: "let user_data = { \"name\": \"Alex\", \"id\": 101 };\nfor key, value in user_data {\n    print(\"key: {key}, value: {value}\\n\");\n}",
                  desc: "When iterating over structs or tuples, you can deconstruct them. Calling `iter()` can be skipped, it's called implicitly."
                }
              ],
            },
            {
              "name": "While Loop",
              "sig": "while <condition> { ... }",
              "desc": "A `while` loop runs as long as a condition is true. The condition is checked at the start of each iteration.",
              "example": [
                {
                  "code": "let number = 3;\nwhile number != 0 {\n    print(\"{number}\\n\");\n    number -= 1;\n}",
                  "desc": "This loop will print the numbers 3, 2, and 1."
                }
              ]
            },
            {
              "name": "Loop",
              "sig": "loop { ... }",
              "desc": "The `loop` keyword creates an infinite loop that continues until it is explicitly told to stop with the `break` statement.",
              "example": [
                {
                  "code": "let counter = 0;\ndecl result: int;\nloop {\n    counter += 1;\n    if counter == 10 {\n        result = counter * 2;\n        break;\n    }\n}\nprint(\"The result is {result}.\\n\");",
                  "desc": "This will print 'The result is 20'. The loop continues until the counter reaches 10, at which point the result is saved and the `break` statement exits the loop."
                }
              ]
            }
          ],
        },
        {
          name: "Composite Data Types",
          functions: [
            {
              name: "Struct",
              sig: "(name1: val1, name2: val2)",
              desc: "A collection of named fields, accessed with dot notation.",
              example: [
                {
                  code: 'let point = (x: 1, y: 2, label: "start");\n\nprint(point.label);',
                  desc: "Define a struct with named fields. Access fields using dot notation. This will print 'start'."
                }
              ],
            },
            {
              name: "Tuple",
              sig: "(val1, val2, ...)",
              desc: "An ordered collection of values, accessed by a numeric index.",
              example: [
                {
                  code: 'let pair = (1, "asd");\n\nprint(pair[0]);',
                  desc: "Define a tuple with values of different types. Access elements by their 0-based index. This will print `1`."
                }
              ],
            },
          ],
        },
        {
          name: "Type definitions",
          functions: [
            {
              name: "Type definition",
              sig: "type <name> = <type>",
              desc: "Assigns a name to a type.",
              example: [
                {
                  code: "type str = <char>;\nfn process_str(input: str) -> str { ... }"
                }
              ],
            },
          ],
        },
        {
          name: "Generics",
          functions: [
            {
              name: "Generic Function",
              sig: "fn <name><T>(param: T) -> ...",
              desc: "Defines a function that can operate on values of different types. Type parameters are declared in angle brackets. The compiler infers the type at the call site.",
              example: [
                {
                  code: 'pub fn print_first<T>(sl: <T>) {\n    if len(sl) > 0 {\n        print(sl[0]);\n        print(\'\\n\');\n    }\n}\n\nlet nums = [10, 20, 30];\nprint_first(nums); // Prints 10\n\nlet names = ["Ren", "Lang"];\nprint_first(names); // Prints "Ren"',
                  desc: "Type parameters like `<T>` allow the function to be generic. The function is called without explicit types; the compiler infers them from the arguments."
                }
              ],
            },
          ],
        },
        {
          name: "Optionals & Error handling",
          functions: [
            {
              name: "Error type",
              sig: "<ok type> ? <error type>",
              desc: "A union type for functions that can return either a success value or a failure value.",
              example: [
                {
                  code: 'fn err_fn(ok: bool) -> <char> ? <char> {\n    if ok {\n        return "ok";\n    } else {\n        return ?"err";\n    }\n}\n\nlet result = err_fn(some_bool);',
                  desc: "The `?` in the return type indicates that the function can fail. Use '?' before an expression to make it an error. The variable `result` now holds either a `<char>` on success or a `<char>` on failure."
                }
              ],
            },
            {
              name: "Optional type",
              sig: "?<type>",
              desc: "Represents a value that may be present or absent.",
              example: [
                {
                  code: 'fn opt_fn(ok: bool) -> ?<char> {\n    if ok {\n        return "ok";\n    } else {\n        return none;\n    }\n}\n\nlet result = opt_fn(some_bool);',
                  desc: "The `?` prefix in the return type indicates the result is optional. The `result` variable might contain a `<char>` or a none value."
                }
              ],
            },
            {
              name: "Error propagation",
              sig: "err_expr?",
              desc: "The `?` operator unwraps a successful value or immediately returns the error from the current function. The calling function's return type must be compatible with the propagated error.",
              example: [
                {
                  code: 'fn read_and_process() -> int ? <char> {\n    let data = read_file("data.txt")?;\n    // ... process data ...\n    return 0;\n}',
                  desc: "If `read_file` fails, the `?` causes `read_and_process` to immediately return the error it received from `read_file`."
                }
              ],
            },
            {
              name: "Panic on error",
              sig: "err_expr!",
              desc: "The `!` operator unwraps a successful value or panics if it's an error, terminating the program. Use this for unrecoverable errors where the program cannot reasonably continue.",
              example: [
                {
                  code: 'let config = read_file("config.ini")!\n\nprint("Config loaded: {config}\\n");',
                  desc: "If `config.ini` is crucial for the program to run, `!` ensures it doesn't proceed in an invalid state. This line will only execute if `read_file` succeeds. Otherwise, the program will crash with an error message."
                }
              ],
            },
            {
              name: "Unwrapping values",
              sig: "let <ok name> = err_expr else <error name> { ... }",
              desc: "Checks for the success variant, binding its value to `<ok name>` in the current scope, or executes the `else` block with the error value.",
              example: [
                {
                  code: 'let result = read("dangerous_file.txt");\n\nlet contents = result else err {\n  eprint("Error reading file: {err}\\n\");\n  exit(1);\n}\n\nprint("Success!\\n{contents}");',
                  desc: "Attempt a failable operation. If it succeeds, `contents` gets the value. If it fails, the `else` block is executed, which can handle the error and terminate the program."
                },
                {
                  code: 'let contents = result else {\n  panic("Unknown error\\n");\n}',
                  desc: "Capturing the error is optional."
                }
              ],
            },
            {
              name: "Conditional unwrapping",
              sig: "if let <ok name> = err_expr { ... } else <error name> { ... }",
              desc: "Checks for the success variant and executes the `if` block with the ok value, or executes the `else` block with the error value.",
              example: [
                {
                  code: 'let result = read_file("data.txt");\n\nif let contents = result {\n  print("Success:\\n");\n  print(contents);\n} else err {\n  eprint("Error: ");\n  eprint(err);\n}',
                  desc: "First, call a function that returns a result. The `if let` construct safely unwraps the result, allowing separate logic for success and failure cases."
                }
              ],
            },
            {
              name: "Unwrapping with a default value",
              sig: "let <ok name> = err_expr else <default expr>",
              desc: "Provides a concise way to unwrap an optional or result, falling back to a a default value if the expression is `none` or an error. The `else` block provides the fallback expression.",
              example: [
                {
                  code: 'let config = { "port": 8080 };\n\nlet port = get(config, "port") else 9000;\nprint("Using port: {port}\\n"); // Prints 8080\n\nlet timeout = get(config, "timeout") else 30;\nprint("Using timeout: {timeout}\\n"); // Prints 30',
                  desc: "Attempt to get a value from a map. If `get` returns a value, it's assigned to the variable. If it returns `none`, the value from the `else` expression is used as a default."
                }
              ],
            },
          ],
        },
        {
          name: "Enums",
          functions: [
            {
              name: "Enum definition",
              sig: "enum <name> { <variant_1>, <variant_2>, ... }",
              desc: "Defines a custom type that can be one of several distinct variants. An instance of an enum can only be one of its variants at a time.",
              example: [
                {
                  code: "enum direction {\n    up,\n    down,\n    left,\n    right\n}\n\nlet go = direction.up;",
                  desc: "Defines a `direction` enum with four possible variants. Create a variable `go` and assign it the `up` variant."
                }
              ],
            },
            {
              name: "Enums with data",
              sig: "enum <name> { <variant>(<type>), ... }",
              desc: "Enum variants can hold associated data. Each variant can have a single type attached to it. To store multiple values, use a tuple.",
              example: [
                {
                  code: "enum message {\n    quit,\n    write(<char>),\n    change_color((int, int, int)) // Holds a single tuple type\n}\n\nlet msg = message.write(\"hello\");\n\nlet color_msg = message.change_color((255, 0, 128));",
                  desc: "Define an enum where some variants hold associated data. Create an instance of the `write` variant. Create an instance of the `change_color` variant, associating a tuple with it."
                }
              ],
            },
            {
              name: "Pattern matching",
              sig: "if let <enum_name>.<variant>(<vars>) = <expr> { ... }",
              desc: "Use `if let` to check if an enum instance matches a specific variant. This destructures the enum, binding any associated data (including values inside a tuple) to variables for use within the `if` block.",
              example: [
                {
                  code: "// Using the message enum from the previous example\nlet msg = message.change_color((255, 0, 128));\n\nif let message.write(text) = msg {\n    print(text);\n} else if let message.change_color(tuple) = msg {\n    let r, g, b = tuple;\n    print(\"New color: {r} {g} {b}\\n\");\n}",
                  desc: "Create an instance of the `change_color` variant. The `if let` chain checks each variant. When a match occurs, its data, including nested tuples, can be destructured and bound to local variables."
                }
              ],
            },
          ],
        },
      ],
    },
    {
      name: "Standard Library",
      entries: [
        {
          name: "Input/Output",
          functions: [
            {
              name: "print",
              sig: "fn print<T>(msg: T)",
              desc: "Prints the provided message to standard output.",
              example: [
                {
                  code: 'print("Hello, ");\nprint("Ren!");\nprint(123);',
                  desc: "Output will be the concatenated string: `Hello, Ren!123`"
                }
              ],
            },
            {
              name: "eprint",
              sig: "fn eprint<T>(msg: T)",
              desc: "Prints the provided message to standard error.",
              example: [
                {
                  code: 'eprint("Error: Something went wrong.\\n");',
                  desc: "This is useful for logging errors without polluting standard output."
                }
              ],
            },
            {
              name: "input",
              sig: "fn input() -> [char]",
              desc: "Reads a line of input from the user until a newline character is encountered.",
              example: [
                {
                  code: 'print("What is your name? ");\nlet name = input();\n\nprint("Hello, ");\nprint(name);',
                  desc: "Read a line of text from standard input into a mutable string list. The captured input can then be used."
                }
              ],
            },
            {
              name: "read",
              sig: "fn read(path: <char>) -> [char] ? <char>",
              desc: "Reads the entire contents of a file at the given path. Returns file contents or an error.",
              example: [
                {
                  code: 'if let contents = read("config.txt") {\n    print("File contents:\\n");\n    print(contents);\n} else err {\n    eprint("Failed to read config: ");\n    eprint(err);\n}'
                }
              ],
            },
            {
              name: "write",
              sig: "fn write(path: <char>, data: <char>) -> int ? <char>",
              desc: "Writes data to the specified file path, creating it if it doesn't exist and overwriting it if it does.",
              example: [
                {
                  code: 'write("log.txt", "This is a log message.\\n")!',
                  desc: "If `log.txt` cannot be written, the program will panic."
                }
              ],
            },
            {
              name: "read_char",
              sig: "fn read_char() -> ?char",
              desc: "Reads a single character from standard input. Returns an optional character, which is `none` if the end of the input stream is reached.",
              example: [
                {
                  code: 'print("Press any key to continue...\\n");\nif let key = read_char() {\n    print("You pressed: \'{key}\'\\n");\n}'
                }
              ]
            }
          ],
        },
        {
          name: "String & Conversion",
          functions: [
            {
              name: "str",
              sig: "fn str<T>(x: T) -> <char>",
              desc: "Converts various types into their string representation.",
              example: [
                {
                  code: "let my_int = 42;\nlet int_as_string = str(my_int);\n\nlet my_bool = true;\nlet bool_as_string = str(my_bool);",
                  desc: "Convert an integer to a string slice. The type is inferred. It also works for other types like booleans, which become 'true' or 'false'."
                }
              ],
            },
            {
              name: "to_lowercase",
              sig: "fn to_lowercase(s: <char>) -> [char]",
              desc: "Creates a new string with all ASCII characters converted to lowercase.",
              example: [
                {
                  code: 'let lower = to_lowercase("HeLLo World");\n// lower is "hello world"'
                }
              ],
            },
            {
              name: "to_uppercase",
              sig: "fn to_uppercase(s: <char>) -> [char]",
              desc: "Creates a new string with all ASCII characters converted to uppercase.",
              example: [
                {
                  code: 'let upper = to_uppercase("HeLLo World");\n// upper is "HELLO WORLD"'
                }
              ],
            },
            {
              name: "null_terminate",
              sig: "fn null_terminate(s: <char>) -> *char",
              desc: "Converts a string slice into a null-terminated string for C interoperability.",
              example: [
                {
                  code: '// Assume a C function `c_puts` that takes a `*char`\nlet my_slice = "Hello from Ren";\nlet c_string = null_terminate(my_slice);\nc_puts(c_string);',
                  desc: "This is essential when calling external C functions that expect C-style strings."
                }
              ],
            },
          ],
        },
        {
          name: "Slice & List Manipulation",
          functions: [
            {
              name: "push",
              sig: "fn push<T>(list: *[T], el: T)\nfn push<T>(list: *[T], sl: <T>)",
              desc: "Pushes a single element or all elements from a slice onto the end of a dynamically-sized list. The list will automatically reallocate if it runs out of capacity.",
              example: [
                {
                  code: "let my_list = +[10, 20];\n\n// Push a single element\npush(&my_list, 30);\n// my_list is now [10, 20, 30]\n\n// Push a slice of elements\npush(&my_list, [40, 50]);\n// my_list is now [10, 20, 30, 40, 50]"
                }
              ],
            },
            {
              name: "pop",
              sig: "fn pop<T>(list: *[T]) -> ?T",
              desc: "Removes the last element from a list and returns it as an optional. Returns `none` if the list is empty.",
              example: [
                {
                  code: "let my_list = +[1, 2, 3];\n\nif let val = pop(&my_list) { print(val); } // Prints 3\n\n// my_list is now [1, 2]"
                }
              ]
            },
            {
              name: "split",
              sig: "fn split<T>(sl: <T>, split: T) -> [<T>]",
              desc: "Splits a slice into sub-slices based on the given delimiter, returning a list of slices.",
              example: [
                {
                  code: "let sentence = \"ren-is-fun\";\nlet parts = split(sentence, '-');\n\nfor part in parts {\n    print(part);\n    print(\" \");\n}",
                  desc: "Split a string slice by a delimiter character. The types are inferred. The result is a list of string slices. This will print 'ren is fun '."
                }
              ],
            },
            {
              name: "join",
              sig: "fn join<T>(list_of_slices: <<T>>, separator: <T>) -> [T]",
              desc: "Joins a list of slices into a single new list, with each element separated by the provided separator.",
              example: [
                {
                  code: "let parts = [\"a\", \"b\", \"c\"];\n\nlet joined = join(parts, \"-\"); // joined is [\"a\", \"-\", \"b\", \"-\", \"c\"]"
                }
              ]
            },
            {
              name: "find",
              sig: "fn find<T>(slice: <T>, value: T) -> ?int\nfn find<T>(haystack: <T>, needle: <T>) -> ?int",
              desc: "Finds the first index of a value in a slice, or the starting index of a sub-slice (needle) within a slice (haystack). Returns `none` if not found.",
              example: [
                {
                  code: "let data = [10, 20, 30, 20];\nprint(find(data, 20)); // Prints 1\n\nlet text = \"hello world\";\nprint(find(text, \"world\")); // Prints 6"
                }
              ]
            },
            {
              name: "contains",
              sig: "fn contains<T>(slice: <T>, value: T) -> bool\nfn contains<T>(haystack: <T>, needle: <T>) -> bool",
              desc: "Checks if a slice contains a given value or if a slice (haystack) contains a given sub-slice (needle).",
              example: [
                {
                  code: "let data = [10, 20, 30];\nprint(contains(data, 20)); // Prints true\n\nlet text = \"hello world\";\nprint(contains(text, \"rld\")); // Prints true"
                }
              ]
            },
            {
              name: "starts_with",
              sig: "fn starts_with<T>(slice: <T>, prefix: <T>) -> bool",
              desc: "Checks if a slice starts with the given prefix.",
              example: [
                {
                  code: "let text = \"abcde\";\n\nprint(starts_with(text, \"ab\")); // Prints true"
                }
              ]
            },
            {
              name: "ends_with",
              sig: "fn ends_with<T>(slice: <T>, suffix: <T>) -> bool",
              desc: "Checks if a slice ends with the given suffix.",
              example: [
                {
                  code: "let text = \"abcde\";\n\nprint(ends_with(text, \"de\")); // Prints true"
                }
              ]
            },
            {
              name: "map",
              sig: "fn map<T, U>(sl: <T>, f: fn(T)->U) -> <U>",
              desc: "Applies a function to each element of a slice and returns a new list containing the results.",
              example: [
                {
                  code: "fn double(n: int) -> int { return n * 2; }\n\nlet nums = [1, 2, 3];\nlet doubled = map(nums, double);\nprint(doubled); // Prints [2, 4, 6]"
                }
              ]
            },
            {
              name: "filter",
              sig: "fn filter<T>(sl: <T>, f: fn(T)->bool) -> <T>",
              desc: "Creates a new list with all elements from a slice that pass the test implemented by the provided function.",
              example: [
                {
                  code: "fn is_even(n: int) -> bool { return n % 2 == 0; }\n\nlet nums = [1, 2, 3, 4, 5];\nlet evens = filter(nums, is_even);\nprint(evens); // Prints [2, 4]"
                }
              ]
            },
            {
              name: "reduce",
              sig: "fn reduce<T, U>(sl: <T>, f: fn(U, T) -> U, initial: U) -> U",
              desc: "Executes a reducer function on each element of the slice, resulting in a single output value.",
              example: [
                {
                  code: "fn sum_reducer(acc: int, val: int) -> int { return acc + val; }\n\nlet nums = [1, 2, 3, 4];\nlet total = reduce(nums, sum_reducer, 0);\nprint(total); // Prints 10"
                }
              ]
            },
            {
              name: "some",
              sig: "fn some<T>(sl: <T>, f: fn(T) -> bool) -> bool",
              desc: "Tests whether at least one element in the slice passes the test implemented by the provided function.",
              example: [
                {
                  code: "fn is_negative(n: int) -> bool { return n < 0; }\n\nlet nums = [1, 2, -3, 4];\nprint(some(nums, is_negative)); // Prints true"
                }
              ]
            },
            {
              name: "all",
              sig: "fn all<T>(sl: <T>, f: fn(T) -> bool) -> bool",
              desc: "Tests whether all elements in the slice pass the test implemented by the provided function.",
              example: [
                {
                  code: "fn is_positive(n: int) -> bool { return n > 0; }\n\nlet nums1 = [1, 2, 3];\nprint(all(nums1, is_positive)); // Prints true\n\nlet nums2 = [1, -2, 3];\nprint(all(nums2, is_positive)); // Prints false"
                }
              ]
            },
            {
              name: "sum",
              sig: "fn sum(sl: <int>) -> int",
              desc: "Calculates the sum of all integers in a slice.",
              example: [
                {
                  code: "let nums = [10, 20, 30];\nprint(sum(nums)); // Prints 60"
                }
              ]
            },
            {
              name: "zip",
              sig: "fn zip<T, U>(sl1: <T>, sl2: <U>) -> <(T, U)>",
              desc: "Creates a new list of tuples, where the i-th tuple contains the i-th element from each of the input slices. The resulting list's length is the minimum of the input slice lengths.",
              example: [
                {
                  code: "let names = [\"A\", \"B\"];\nlet scores = [99, 88, 77];\nfor name, score in zip(names, scores) {\n  print(\"{name}: {score}\\n\");\n}"
                }
              ]
            }
          ],
        },
        {
          name: "Hash Map",
          functions: [
            {
              name: "insert",
              sig: "fn insert<K, V>(map_ref: *{K: V}, key: K, value: V)",
              desc: "Inserts a key-value pair into the hash map.",
              warn: "Use the short-hand syntax instead (map[key] = value).",
              example: [
                {
                  code: 'let data = { "a": 1 };\n\ndata["b"] = 2;\n// data is now { "a": 1, "b": 2 }',
                  desc: 'The shorthand `map[key] = value` is the preferred way to insert or update a value.'
                }
              ]
            },
            {
              name: "get",
              sig: "fn get<K, V>(map: {K: V}, key: K) -> ?V",
              desc: "Retrieves a value from the hash map by key. Returns an optional value.",
              warn: "Use the short-hand syntax instead (value = map[key]).",
              example: [
                {
                  code: 'let data = { "a": 1 };\n\nif let val = data["a"] {\n    print(val); // Prints 1\n}\n\nlet default_val = data["b"] else 0;\nprint(default_val); // Prints 0',
                  desc: 'The shorthand `map[key]` is the preferred way to access a value, which returns an optional.'
                }
              ]
            },
            {
              name: "remove",
              sig: "fn remove<K, V>(map: {K: V}, key: K) -> ?V",
              desc: "Removes a key and its associated value from the hash map, returning the value as an optional.",
              example: [
                {
                  code: 'let data = { "a": 1, "b": 2 };\n\nif let val = remove(data, "b") { print(val); } // Prints 2\n\n// data is now { "a": 1 }'
                }
              ]
            },
            {
              name: "iter",
              sig: "fn iter<K, V>(map: {K: V}) -> [(key: K, value: V)]",
              desc: "Returns an iterable list of key-value pairs from the hash map. The items are structs with `key` and `value` fields.",
              warn: "Can often be ommited.",
              example: [
                {
                  code: 'let user = { "name": "Ren", "id": 42 };\n\nfor field in iter(user) {\n    print("Key: {field.key}, Value: {field.value}\\n\");\n}',
                  desc: 'A better way to write this is deconstructing `field` and letting `iter` get called automatically.'
                },
                {
                  code: 'let user = { "name": "Ren", "id": 42 };\n\nfor key, value in user {\n    print("Key: {key}, Value: {value}\\n\");\n}'
                }
              ]
            }
          ],
        },
        {
          name: "Filesystem",
          functions: [
            {
              name: "rename",
              sig: "fn rename(old_path: <char>, new_path: <char>) -> int ? <char>",
              desc: "Renames a file or directory from old_path to new_path. Returns an error message on failure.",
              example: [
                {
                  code: 'let result = rename("old.txt", "new.txt");\nif let ok = result {} else err {\n    panic(err);\n}'
                }
              ],
            },
            {
              name: "mkdir",
              sig: "fn mkdir(path: <char>) -> int ? <char>",
              desc: "Creates a new directory at the given path. Returns an error message on failure.",
              example: [
                {
                  code: 'mkdir("new_directory")!; // Panic if directory creation fails'
                }
              ],
            },
            {
              name: "rmdir",
              sig: "fn rmdir(path: <char>) -> int ? <char>",
              desc: "Removes an empty directory at the specified path. Returns an error message if the directory is not empty or doesn't exist.",
              example: [
                {
                  code: 'rmdir("empty_directory")?; // Propagate error if it fails'
                }
              ],
            },
            {
              name: "rm",
              sig: "fn rm(path: <char>) -> int ? <char>",
              desc: "Deletes the file at the given path. Returns an error message on failure.",
              example: [
                {
                  code: 'rm("file_to_delete.txt")!;'
                }
              ],
            },
            {
              name: "exists",
              sig: "fn exists(path: <char>) -> bool",
              desc: "Checks if a file or directory exists at the given path.",
              example: [
                {
                  code: 'if exists("my_file.txt") {\n    print("File exists!\\n");\n}'
                }
              ],
            },
            {
              name: "is_dir",
              sig: "fn is_dir(path: <char>) -> bool",
              desc: "Returns true if the path refers to a directory.",
              example: [
                {
                  code: 'if is_dir("my_folder") {\n    print("It is a directory.\\n");\n}'
                }
              ],
            },
            {
              name: "list_dir",
              sig: "fn list_dir(path: <char>) -> [<char>] ? <char>",
              desc: "Lists all entries in the specified directory. Returns an error message on failure.",
              example: [
                {
                  code: 'if let entries = list_dir(".") {\n    for entry in entries {\n        print(entry);\n        print("\\n");\n    }\n} else err {\n    eprint(err);\n}'
                }
              ],
            },
          ],
        },
        {
          name: "Process",
          functions: [
            {
              name: "run",
              sig: "fn run(command: <char>, argv: <<char>>) -> int ? <char>",
              desc: "Executes an external command and waits for it to complete. Returns the process's exit code or an error if execution fails.",
              example: [
                {
                  code: 'let exit_code = run("ls", ["ls", "-l", "/"])!;\n\nprint("Command finished with exit code: {exit_code}\\n");'
                }
              ]
            }
          ]
        },
        {
          name: "Parsing & Argument Handling",
          functions: [
            {
              name: "print_help",
              sig: "fn print_help(name: *char, expected: <<char>>)",
              desc: "Prints a standard usage message. Part of the automatic argument parsing for `main`.",
              warn: "This function is part of the automatic argument parsing for `main` and should not be called directly."
            },
            {
              name: "arg_parse",
              sig: "fn arg_parse(args: <*char>, expected: <<char>>) -> int ? <char>",
              desc: "Parses positional arguments. Part of the automatic argument parsing for `main`.",
              warn: "This function is part of the automatic argument parsing for `main` and should not be called directly."
            },
            {
              name: "parse (int)",
              sig: "fn parse(str: *char, res: *int) -> int ? <char>",
              desc: "Parses a string into an integer. Returns an error on failure. Used internally by the automatic argument parser.",
              example: [
                {
                  code: '// Given a command line argument `argv[1]`\nlet my_num: int;\nif let ok = parse(argv[1], &my_num) {\n    print("Parsed number successfully!");\n} else err {\n    panic(err);\n}'
                }
              ],
            },
            {
              name: "parse (string)",
              sig: "fn parse(str: *char, res: *<char>) -> int ? <char>",
              desc: "Parses a string and stores a copy into the provided buffer. Used internally by the automatic argument parser.",
              example: [
                {
                  code: "// Given a command line argument `argv[1]`\nlet my_str: <char>;\nparse(argv[1], &my_str)!;"
                }
              ],
            },
            {
              name: "parse_opt",
              sig: "fn parse_opt<T>(argc: *int, argv: **char, name: <char>, opt: *?T) -> int ? <char>",
              desc: "Parses an optional command-line argument. Part of the automatic argument parsing for `main`.",
              warn: "This function is part of the automatic argument parsing for `main` and should not be called directly."
            },
          ],
        },
        {
          name: "Memory & Allocation",
          functions: [
            {
              name: "alloc",
              sig: "fn alloc(size: int) -> *any",
              desc: "Allocates memory from a custom heap allocator and returns a pointer to it.",
              warn: "Using built in lists, hashmaps and the '+' operator is preferred.",
            },
            {
              name: "calloc",
              sig: "fn calloc(size: int) -> *any",
              desc: "Allocates a block of memory of the specified size and initializes all its bytes to zero.",
              warn: "Using built in lists, hashmaps and the '+' operator is preferred.",
            },
            {
              name: "init",
              sig: "fn init()",
              desc: "Initializes the memory allocator with default values.",
              warn: "Shouldn't be used - called automatically",
            },
          ],
        },
        {
          name: "Utilities",
          functions: [
            {
              name: "cmp",
              sig: "fn cmp<T>(l: T, r: T) -> bool",
              desc: "Compares two values for equality. Returns true if they are equal, false if not.",
              warn: 'Use the shorthand syntax instead: "hello" == "hello" or "hello" != "hello"',
              example: [
                {
                  code: '// Compare two integers\nprint(cmp(5, 5)); // Prints true\n\n// Compare two slices\nprint(cmp("hello", "hello")); // Prints true\n\n// Typically used for comparing command line args (`*char`)\n// with a known string slice (`<char>`).\nif cmp(argv[1], "--help") {\n    print_help();\n}'
                },
                {
                  code: 'if "hello" == "world" {\n    // ...\n}',
                  desc: 'The `==` and `!=` operators are shorthand for `cmp()` and are the preferred way to compare values.'
                }
              ],
            },
            {
              name: "hash",
              sig: "fn hash<T>(x: T) -> int",
              desc: "Computes a 64-bit FNV-1a hash. It is overloaded to accept either an integer or a character slice.",
              example: [
                {
                  code: "let h1 = hash(12345);\nprint(h1);\n\nlet h2 = hash(\"ren\");\nprint(h2);"
                }
              ],
            },
            {
              name: "is_alpha",
              sig: "fn is_alpha(ch: char) -> bool",
              desc: "Checks if a character is an ASCII alphabet character (a-z, A-Z).",
              example: [
                {
                  code: "print(is_alpha('a')); // Prints true\nprint(is_alpha('5')); // Prints false"
                }
              ]
            }
          ],
        },
        {
          name: "Error Handling",
          functions: [
            {
              name: "panic",
              sig: "fn panic<T>(x: T)\nfn panic()",
              desc: "Prints an error message and terminates the program with exit code 1. If called with no arguments, it prints a generic 'PANIC' message. Often replaced by the `!` operator for conciseness.",
              example: [
                {
                  code: 'let result = read("must_exist.txt");\n\nlet contents = result else err {\n    panic(err); // Panics with the error from read()\n}',
                  desc: "The '!' operator is a shortcut for the above:\n`let contents = read(\"must_exist.txt\")!;`"
                }
              ],
            },
          ],
        },
        {
          name: "Debugging",
          functions: [
            {
              name: "assert",
              sig: "fn assert(condition: bool, message: <char>)",
              desc: "Checks if a condition is true at runtime. If the condition is false, it prints the provided error message and terminates the program with exit code 1. This is useful for verifying program invariants.",
              example: [
                {
                  code: 'let a = 5;\nassert(a == 5, "Value should have been 5"); // Continues\n\nassert(a > 10, "Value is not greater than 10"); // Panics'
                }
              ]
            },
            {
              name: "print_heap",
              sig: "fn print_heap()",
              desc: "A debugging utility that prints the raw contents of the heap to standard output. Useful for inspecting memory layout and GC behavior.",
              warn: "This function is for debugging purposes only."
            },
            {
              name: "print_stack",
              sig: "fn print_stack(offset: int, len: int)",
              desc: "A debugging utility that prints a segment of the stack to standard output. `offset` specifies the starting point relative to the current stack frame, and `len` is the number of 8-byte words to print.",
              warn: "This function is for debugging purposes only."
            }
          ]
        }
      ],
    },
    {
      name: "JSON Library",
      entries: [
        {
          name: "Serialization & Deserialization",
          functions: [
            {
              name: "to_json",
              sig: "fn to_json<T>(value: T) -> <char>",
              desc: "Serializes a Ren value into a JSON string. Supports primitives, lists, slices, structs, and maps. Map keys are converted to strings.",
              example: [
                {
                  code: 'let user = (name: "Ren", id: 123, active: true, roles: ["admin", "editor"]);\nlet json = to_json(user);\nprint(json);',
                  desc: 'This will format a user to a json format and print it.'
                }
              ]
            },
            {
              name: "from_json",
              sig: "fn from_json<T>(json_str: <char>, out: *T) -> int ? <char>",
              desc: "Deserializes a JSON string into a Ren data structure. The target data structure must be passed as a mutable pointer. Returns an error on parsing failure.",
              example: [
                {
                  code: 'type Config = (version: int, features: {<char>: bool});\nlet json_input = \"{\\\"version\\\": 2, \\\"features\\\": {\\\"beta\\\": true}}\";\ndecl my_config: Config;\nfrom_json(json_input, &my_config)!;\n\nprint(my_config.version); // Prints 2\n\nif let enabled = my_config.features["beta"] { print(enabled); } // Prints true',
                  desc: 'This will parse the input json config into a usable struct.'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      name: "Built-in",
      entries: [
        {
          name: "Built-in Functions",
          functions: [
            {
              name: "len",
              sig: "len(ptr: <any>) -> int",
              desc: "Returns the length of a pointer to an array, slice, or list. Accepts one argument.",
              example: [
                {
                  code: "let my_array = [10, 20, 30, 40];\nprint(len(my_array));",
                  desc: "Get the length of a stack-allocated array. This prints 4."
                },
                {
                  code: "let my_slice = my_array[1..3]; // [20, 30]\nprint(len(my_slice));",
                  desc: "Get the length of a slice. This prints 2."
                }
              ],
            },
            {
              name: "sp",
              sig: "sp() -> *any",
              desc: "Returns the current stack pointer. Takes no arguments.",
              warn: "Probably shouldn't use this.",
            },
            {
              name: "copy",
              sig: "copy(src: *any, dest: *any, count: int) -> void",
              desc: "Copies `count` elements from `src` to `dest`.",
              example: [
                {
                  code: "let src = [1, 2, 3];\nlet dest = [0, 0, 0];\n\ncopy(&src, &dest, 3);\nprint(dest); // dest is now [1, 2, 3]",
                  desc: "Define source and destination buffers of the same type and size. Copy 3 elements from `src` to `dest`. The destination must have enough capacity."
                }
              ],
            },
            {
              name: "sizeof",
              sig: "sizeof(type: type) -> int",
              desc: "Returns the size in bytes of the specified type. Requires one type argument.",
              example: [
                {
                  code: "print(sizeof(bool));",
                  desc: "Get the size of a primitive type in bytes. This prints 1."
                },
                {
                  code: "print(sizeof([int]));",
                  desc: "Get the size of a complex type like a list, which is a length and a pointer. This prints 16 (8 + 8)."
                }
              ],
            },
            {
              name: "param",
              sig: "param(p: any) -> void",
              desc: "Forces a function parameter outside of a function call.",
              warn: "Probably shouldn't use this.",
            },
            {
              name: "istype",
              sig: "istype(val: any, type: type) -> bool",
              desc: "Checks if the given value matches the specified type. Takes one argument and one type argument.",
              warn: "Probably shouldn't use this.",
            },
          ],
        },
      ],
    },
  ];
}
