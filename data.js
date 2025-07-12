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
              sig: "fn main() { ... }",
              desc: "The entry point for every Ren program. Execution starts here.",
              example: [
                'import lib/std\n\nfn main() {\n    print("Hello, world!\\n");\n}',
                "To build and run:",
                'renc hello.re\n./out'
              ],
            },
            {
              name: "import",
              sig: "import <path>",
              desc: "Imports another Ren file, bringing its public functions and types into the current namespace. The path is relative and the `.re` extension is omitted.",
              example: [
                '// in file: my_lib.re\npub fn say_hi() {\n    print("Hi from my_lib!\\n");\n}\n\n// in file: main.re\nimport my_lib\n\nfn main() {\n    say_hi(); // a direct call\n}',
                "Define a public function in `my_lib.re`. Import `my_lib.re` and call its public function directly without a namespace qualifier. To build and run:",
                'renc main.re\n./out'
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
                "let my_int = 5;\nlet my_char = 'a';\nlet my_bool = true;",
                "The type is inferred.",
              ],
            },
            {
              name: "decl",
              sig: "decl <name>: <type>",
              desc: "Declares a variable. The memory is zeroed.",
              example: [
                "decl my_int: int;\ndecl my_char: char;\ndecl my_bool: bool;",
              ],
            },
            {
              name: "<char> (String Slice)",
              sig: '"a string literal"',
              desc: "A string slice is an immutable view into a sequence of characters. String literals create slices.",
              example: [
                'let name = "Ren";',
                "String slices are immutable and cannot be modified directly.",
              ],
            },
            {
              name: "[char] (String List)",
              sig: '+"a string literal"',
              desc: "A string list is a mutable, heap-allocated list of characters. The `+` operator copies a slice to the heap to create a list.",
              example: [
                'let greeting = +"Hello";\n\npush(&greeting, \'!\');\nprint(greeting);',
                "Create a mutable string by copying a slice to the heap. The list can then be modified. This will print 'Hello!'.",
              ],
            },
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
                "let array = [1, 2, 3];",
                "The size of an array is fixed at compile time and cannot be changed.",
              ],
            },
            {
              name: "List",
              sig: "+[val1, val2, ...]",
              desc: "A dynamically-sized, heap-allocated collection. Created using the `+` operator.",
              example: [
                "let list = +[1, 2, 3];\n\npush(&list, 4);\nprint(list[3]);",
                "Create a heap-allocated, resizable list by prefixing an array literal with `+`. Elements can be added to the list. This prints `4`.",
              ],
            },
            {
              name: "Slicing & Ranges",
              sig: "<collection>[start..end]",
              desc: "Creates a view into a collection using a range (`..`). Slices are iterable.",
              example: [
                "let arr1234 = [1, 2, 3, 4];\nlet sl23 = arr1234[1..3];\n\nlet sl123 = arr1234[..3];\n\nlet sl234 = arr1234[1..];",
                "Creates a slice `sl23` containing `[2, 3]`. Omitting the start index defaults to 0. Creates a slice `sl123` containing `[1, 2, 3]`. Omitting the end index defaults to the length of the collection. Creates `sl234` containing `[2, 3, 4]`.",
              ],
            },
            {
              name: "For Loop",
              sig: "for <var> in <iterable> { ... }",
              desc: "Iterates over any iterable type, such as a range, array, slice, list, or the result of `iter()`.",
              example: [
                "for i in 0..5 {\n    print(i);\n}\n\nlet names = [\"A\", \"B\", \"C\"];\nfor name in names {\n    print(name);\n}\n\nlet user_data = { \"name\": \"Alex\", \"id\": 101 };\nfor field in iter(user_data) {\n    print(\"key: {field.key}, value: {field.value}\\n\");\n}",
                "Iterating over a range. This will print the numbers 0 through 4. Iterating over an array slice. This will print 'A', 'B', and 'C'. Iterating over a hash map using the `iter()` function.",
                "let user_data = { \"name\": \"Alex\", \"id\": 101 };\nfor key, value in user_data {\n    print(\"key: {key}, value: {value}\\n\");\n}",
                "When iterating over structs or tuples, you can deconstruct them. Calling `iter()` can be skipped, it's called implicitly.",
              ],
            },
            {
              "name": "While Loop",
              "sig": "while <condition> { ... }",
              "desc": "A `while` loop runs as long as a condition is true. The condition is checked at the start of each iteration.",
              "example": [
                "let number = 3;\nwhile number != 0 {\n    print(\"{number}\\n\");\n    number -= 1;\n}",
                "This loop will print the numbers 3, 2, and 1."
              ]
            },
            {
              "name": "Loop",
              "sig": "loop { ... }",
              "desc": "The `loop` keyword creates an infinite loop that continues until it is explicitly told to stop, often with the `break` statement.",
              "example": [
                "let counter = 0;\ndecl result: int;\nloop {\n    counter += 1;\n    if counter == 10 {\n        result = counter * 2;\n        break;\n    }\n};\nprint(\"The result is {result}\\n\");",
                "This will print 'The result is 20'. The loop continues until the counter reaches 10, at which point the result is saved and the `break` statement exits the loop."
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
                'let point = (x: 1, y: 2, label: "start");\n\nprint(point.label);',
                "Define a struct with named fields. Access fields using dot notation. This will print 'start'.",
              ],
            },
            {
              name: "Tuple",
              sig: "(val1, val2, ...)",
              desc: "An ordered collection of values, accessed by a numeric index.",
              example: [
                'let pair = (1, "asd");\n\nprint(pair[0]);',
                "Define a tuple with values of different types. Access elements by their 0-based index. This will print `1`.",
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
                "type str = <char>;\nfn process_str(input: str) -> str { ... }",
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
                '// A generic function that works on a slice of any type T.\npub fn print_first<T>(sl: <T>) {\n    if len(sl) > 0 {\n        print(sl[0]);\n        print("\\n");\n    }\n}\n\nlet nums = [10, 20, 30];\nprint_first(nums); // Prints 10\n\nlet names = ["Ren", "Lang"];\nprint_first(names); // Prints "Ren"',
                "Type parameters like `<T>` allow the function to be generic. The function is called without explicit types; the compiler infers them from the arguments.",
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
                'fn err_fn(ok: bool) -> <char> ? <char> {\n    if ok {\n        return "ok";\n    } else {\n        return ?"err";\n    }\n}\n\nlet result = err_fn(some_bool);',
                "The `?` in the return type indicates that the function can fail. Use '?' before an expression to make it an error. The variable `result` now holds either a `<char>` on success or a `<char>` on failure.",
              ],
            },
            {
              name: "Optional type",
              sig: "?<type>",
              desc: "Represents a value that may be present or absent.",
              example: [
                'fn opt_fn(ok: bool) -> ?<char> {\n    if ok {\n        return "ok";\n    } else {\n        return none;\n    }\n}\n\nlet result = opt_fn(some_bool);',
                "The `?` prefix in the return type indicates the result is optional. The `result` variable might contain a `<char>` or a none value.",
              ],
            },
            {
              name: "Error propagation",
              sig: "err_expr?",
              desc: "The `?` operator unwraps a successful value or immediately returns the error from the current function. The calling function's return type must be compatible with the propagated error.",
              example: [
                'fn read_and_process() -> int ? <char> {\n    let data = read_file("data.txt")?;\n    // ... process data ...\n    return 0;\n}',
                "If `read_file` fails, the `?` causes `read_and_process` to immediately return the error it received from `read_file`.",
              ],
            },
            {
              name: "Panic on error",
              sig: "err_expr!",
              desc: "The `!` operator unwraps a successful value or panics if it's an error, terminating the program. Use this for unrecoverable errors where the program cannot reasonably continue.",
              example: [
                'let config = read_file("config.ini")!\n\nprint("Config loaded: {config}\\n");',
                "If `config.ini` is crucial for the program to run, `!` ensures it doesn't proceed in an invalid state. This line will only execute if `read_file` succeeds. Otherwise, the program will crash with an error message.",
              ],
            },
            {
              name: "Unwrapping values",
              sig: "let <ok name> = err_expr else <error name> { ... }",
              desc: "Checks for the success variant, binding its value to `<ok name>` in the current scope, or executes the `else` block with the error value.",
              example: [
                'let result = read("dangerous_file.txt");\n\nlet contents = result else err {\n  eprint("Error reading file: {err}\\n\");\n  exit(1);\n}\n\nprint("Success!\\n{contents}");',
                "Attempt a failable operation. If it succeeds, `contents` gets the value. If it fails, the `else` block is executed, which can handle the error and terminate the program.",
                'let contents = result else {\n  panic("Unknown error\\n");\n}',
                "Capturing the error is optional."
              ],
            },
            {
              name: "Conditional unwrapping",
              sig: "if let <ok name> = err_expr { ... } else <error name> { ... }",
              desc: "Checks for the success variant and executes the `if` block with the ok value, or executes the `else` block with the error value.",
              example: [
                'let result = read_file("data.txt");\n\nif let contents = result {\n  print("Success:\\n");\n  print(contents);\n} else err {\n  eprint("Error: ");\n  eprint(err);\n}',
                "First, call a function that returns a result. The `if let` construct safely unwraps the result, allowing separate logic for success and failure cases.",
              ],
            },
            {
              name: "Unwrapping with a default value",
              sig: "let <ok name> = err_expr else <default expr>",
              desc: "Provides a concise way to unwrap an optional or result, falling back to a default value if the expression is `none` or an error. The `else` block provides the fallback expression.",
              example: [
                'let config = { "port": 8080 };\n\nlet port = get(config, "port") else 9000;\nprint("Using port: {port}\\n"); // Prints 8080\n\nlet timeout = get(config, "timeout") else 30;\nprint("Using timeout: {timeout}\\n"); // Prints 30',
                "Attempt to get a value from a map. If `get` returns a value, it's assigned to the variable. If it returns `none`, the value from the `else` expression is used as a default.",
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
                "enum direction {\n    up,\n    down,\n    left,\n    right\n}\n\nlet go = direction.up;",
                "Defines a `direction` enum with four possible variants. Create a variable `go` and assign it the `up` variant.",
              ],
            },
            {
              name: "Enums with data",
              sig: "enum <name> { <variant>(<type>), ... }",
              desc: "Enum variants can hold associated data. Each variant can have a single type attached to it. To store multiple values, use a tuple.",
              example: [
                "enum message {\n    quit,\n    write(<char>),\n    change_color((int, int, int)) // Holds a single tuple type\n}\n\nlet msg = message.write(\"hello\");\n\nlet color_msg = message.change_color((255, 0, 128));",
                "Define an enum where some variants hold associated data. Create an instance of the `write` variant. Create an instance of the `change_color` variant, associating a tuple with it.",
              ],
            },
            {
              name: "Pattern matching",
              sig: "if let <enum_name>.<variant>(<vars>) = <expr> { ... }",
              desc: "Use `if let` to check if an enum instance matches a specific variant. This destructures the enum, binding any associated data (including values inside a tuple) to variables for use within the `if` block.",
              example: [
                "// Using the message enum from the previous example\nlet msg = message.change_color((255, 0, 128));\n\nif let message.write(text) = msg {\n    print(text);\n} else if let message.change_color((r, g, b)) = msg {\n    print(\"New color: {r}\\n\");\n}",
                "Create an instance of the `change_color` variant. The `if let` chain checks each variant. When a match occurs, its data, including nested tuples, can be destructured and bound to local variables.",
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
                'print("Hello, ");\nprint("Ren!");\nprint(123);',
                "Output will be the concatenated string: `Hello, Ren!123`",
              ],
            },
            {
              name: "eprint",
              sig: "fn eprint<T>(msg: T)",
              desc: "Prints the provided message to standard error.",
              example: [
                'eprint("Error: Something went wrong.\\n");',
                "This is useful for logging errors without polluting standard output.",
              ],
            },
            {
              name: "input",
              sig: "fn input() -> [char]",
              desc: "Reads a line of input from the user until a newline character is encountered.",
              example: [
                'print("What is your name? ");\nlet name = input();\n\nprint("Hello, ");\nprint(name);',
                "Read a line of text from standard input into a mutable string list. The captured input can then be used.",
              ],
            },
            {
              name: "read",
              sig: "fn read(path: <char>) -> [char] ? <char>",
              desc: "Reads the entire contents of a file at the given path. Returns file contents or an error.",
              example: [
                'if let contents = read("config.txt") {\n    print("File contents:\\n");\n    print(contents);\n} else err {\n    eprint("Failed to read config: ");\n    eprint(err);\n}',
              ],
            },
            {
              name: "write",
              sig: "fn write(path: <char>, data: <char>) -> int ? <char>",
              desc: "Writes data to the specified file path, creating it if it doesn't exist and overwriting it if it does.",
              example: [
                'write("log.txt", "This is a log message.\\n")!',
                "If `log.txt` cannot be written, the program will panic.",
              ],
            },
            {
              name: "read_char",
              sig: "fn read_char() -> ?char",
              desc: "Reads a single character from standard input. Returns an optional character, which is `none` if the end of the input stream is reached.",
              example: [
                'print("Press any key to continue...\\n");\nif let key = read_char() {\n    print("You pressed: \'{key}\'\\n");\n}'
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
                "let my_int = 42;\nlet int_as_string = str(my_int);\n\nlet my_bool = true;\nlet bool_as_string = str(my_bool);",
                "Convert an integer to a string slice. The type is inferred. It also works for other types like booleans, which become 'true' or 'false'.",
              ],
            },
            {
              name: "to_lowercase",
              sig: "fn to_lowercase(s: <char>) -> [char]",
              desc: "Creates a new string with all ASCII characters converted to lowercase.",
              example: ['let lower = to_lowercase("HeLLo World");\n// lower is "hello world"'],
            },
            {
              name: "to_uppercase",
              sig: "fn to_uppercase(s: <char>) -> [char]",
              desc: "Creates a new string with all ASCII characters converted to uppercase.",
              example: ['let upper = to_uppercase("HeLLo World");\n// upper is "HELLO WORLD"'],
            },
            {
              name: "null_terminate",
              sig: "fn null_terminate(s: <char>) -> *char",
              desc: "Converts a string slice into a null-terminated string for C interoperability.",
              example: [
                '// Assume a C function `c_puts` that takes a `*char`\nlet my_slice = "Hello from Ren";\nlet c_string = null_terminate(my_slice);\nc_puts(c_string);',
                "This is essential when calling external C functions that expect C-style strings.",
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
                "let my_list = +[10, 20];\n\n// Push a single element\npush(&my_list, 30);\n// my_list is now [10, 20, 30]\n\n// Push a slice of elements\npush(&my_list, [40, 50]);\n// my_list is now [10, 20, 30, 40, 50]"
              ],
            },
            {
              name: "pop",
              sig: "fn pop<T>(list: *[T]) -> ?T",
              desc: "Removes the last element from a list and returns it as an optional. Returns `none` if the list is empty.",
              example: [
                "let my_list = +[1, 2, 3];\n\nif let val = pop(&my_list) { print(val); } // Prints 3\n\n// my_list is now [1, 2]"
              ]
            },
            {
              name: "split",
              sig: "fn split<T>(sl: <T>, split: T) -> [<T>]",
              desc: "Splits a slice into sub-slices based on the given delimiter, returning a list of slices.",
              example: [
                "let sentence = \"ren-is-fun\";\nlet parts = split(sentence, '-');\n\nfor part in parts {\n    print(part);\n    print(\" \");\n}",
                "Split a string slice by a delimiter character. The types are inferred. The result is a list of string slices. This will print 'ren is fun '.",
              ],
            },
            {
              name: "join",
              sig: "fn join<T>(list_of_slices: <<T>>, separator: <T>) -> [T]",
              desc: "Joins a list of slices into a single new list, with each element separated by the provided separator.",
              example: [
                "let parts = [\"a\", \"b\", \"c\"];\n\nlet joined = join(parts, \"-\"); // joined is [\"a\", \"-\", \"b\", \"-\", \"c\"]"
              ]
            },
            {
              name: "find",
              sig: "fn find<T>(slice: <T>, value: T) -> ?int\nfn find<T>(haystack: <T>, needle: <T>) -> ?int",
              desc: "Finds the first index of a value in a slice, or the starting index of a sub-slice (needle) within a slice (haystack). Returns `none` if not found.",
              example: [
                "let data = [10, 20, 30, 20];\nprint(find(data, 20)); // Prints 1\n\nlet text = \"hello world\";\nprint(find(text, \"world\")); // Prints 6",
              ]
            },
            {
              name: "contains",
              sig: "fn contains<T>(slice: <T>, value: T) -> bool\nfn contains<T>(haystack: <T>, needle: <T>) -> bool",
              desc: "Checks if a slice contains a given value or if a slice (haystack) contains a given sub-slice (needle).",
              example: [
                "let data = [10, 20, 30];\nprint(contains(data, 20)); // Prints true\n\nlet text = \"hello world\";\nprint(contains(text, \"rld\")); // Prints true"
              ]
            },
            {
              name: "starts_with",
              sig: "fn starts_with<T>(slice: <T>, prefix: <T>) -> bool",
              desc: "Checks if a slice starts with the given prefix.",
              example: [
                "let text = \"abcde\";\n\nprint(starts_with(text, \"ab\")); // Prints true"
              ]
            },
            {
              name: "ends_with",
              sig: "fn ends_with<T>(slice: <T>, suffix: <T>) -> bool",
              desc: "Checks if a slice ends with the given suffix.",
              example: [
                "let text = \"abcde\";\n\nprint(ends_with(text, \"de\")); // Prints true"
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
            },
            {
              name: "get",
              sig: "fn get<K, V>(map: {K: V}, key: K) -> ?V",
              desc: "Retrieves a value from the hash map by key. Returns an optional value.",
              warn: "Use the short-hand syntax instead (value = map[key]).",
            },
            {
              name: "remove",
              sig: "fn remove<K, V>(map: {K: V}, key: K) -> ?V",
              desc: "Removes a key and its associated value from the hash map, returning the value as an optional.",
              example: [
                'let data = { "a": 1, "b": 2 };\n\nif let val = remove(data, "b") { print(val); } // Prints 2\n\n// data is now { "a": 1 }',
              ]
            },
            {
              name: "iter",
              sig: "fn iter<K, V>(map: {K: V}) -> [(key: K, value: V)]",
              desc: "Returns an iterable list of key-value pairs from the hash map. The items are structs with `key` and `value` fields.",
              example: [
                'let user = { "name": "Ren", "id": 42 };\n\nfor field in iter(user) {\n    print("Key: {field.key}, Value: {field.value}\\n\");\n}',
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
                'let result = rename("old.txt", "new.txt");\nif let ok = result {} else err {\n    panic(err);\n}',
              ],
            },
            {
              name: "mkdir",
              sig: "fn mkdir(path: <char>) -> int ? <char>",
              desc: "Creates a new directory at the given path. Returns an error message on failure.",
              example: [
                'mkdir("new_directory")!; // Panic if directory creation fails',
              ],
            },
            {
              name: "rmdir",
              sig: "fn rmdir(path: <char>) -> int ? <char>",
              desc: "Removes an empty directory at the specified path. Returns an error message if the directory is not empty or doesn't exist.",
              example: [
                'rmdir("empty_directory")?; // Propagate error if it fails',
              ],
            },
            {
              name: "rm",
              sig: "fn rm(path: <char>) -> int ? <char>",
              desc: "Deletes the file at the given path. Returns an error message on failure.",
              example: ['rm("file_to_delete.txt")!;'],
            },
            {
              name: "exists",
              sig: "fn exists(path: <char>) -> bool",
              desc: "Checks if a file or directory exists at the given path.",
              example: [
                'if exists("my_file.txt") {\n    print("File exists!\\n");\n}',
              ],
            },
            {
              name: "is_dir",
              sig: "fn is_dir(path: <char>) -> bool",
              desc: "Returns true if the path refers to a directory.",
              example: [
                'if is_dir("my_folder") {\n    print("It is a directory.\\n");\n}',
              ],
            },
            {
              name: "list_dir",
              sig: "fn list_dir(path: <char>) -> [<char>] ? <char>",
              desc: "Lists all entries in the specified directory. Returns an error message on failure.",
              example: [
                'if let entries = list_dir(".") {\n    for entry in entries {\n        print(entry);\n        print("\\n");\n    }\n} else err {\n    eprint(err);\n}',
              ],
            },
          ],
        },
        {
          name: "Parsing & Argument Handling",
          functions: [
            {
              name: "print_help",
              sig: "fn print_help(name: *char, expected: <<char>>)",
              desc: "Prints help text with the expected command-line arguments.",
              warn: "Shouldn't be used - called automatically",
            },
            {
              name: "arg_parse",
              sig: "fn arg_parse(args: <*char>, expected: <<char>>) -> int ? <char>",
              desc: "Parses arguments and ensures the correct number of arguments is passed.",
              warn: "Shouldn't be used - called automatically",
            },
            {
              name: "parse (int)",
              sig: "fn parse(str: *char, res: *int) -> int ? <char>",
              desc: "Parses a string into an integer. Returns an error on failure.",
              example: [
                '// Given a command line argument `argv[1]`\nlet my_num: int;\nif let ok = parse(argv[1], &my_num) {\n    print("Parsed number successfully!");\n} else err {\n    panic(err);\n}',
              ],
            },
            {
              name: "parse (string)",
              sig: "fn parse(str: *char, res: *<char>) -> int ? <char>",
              desc: "Parses a string and stores a copy into the provided buffer.",
              example: [
                "// Given a command line argument `argv[1]`\nlet my_str: <char>;\nparse(argv[1], &my_str)!;",
              ],
            },
            {
              name: "parse_opt",
              sig: "fn parse_opt<T>(argc: *int, argv: **char, name: <char>, opt: *?T) -> int ? <char>",
              desc: "Parses an optional command-line argument with the format --name <value>.",
              warn: "Shouldn't be used - called automatically",
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
              desc: "Compares two values for equality. This function is overloaded to work with integers, character slices (`<char>`), and for comparing a null-terminated C-style string (`*char`) with a slice.",
              example: [
                '// Compare two integers\nprint(cmp(5, 5)); // Prints true\n\n// Compare two slices\nprint(cmp("hello", "hello")); // Prints true\n\n// Typically used for comparing command line args (`*char`)\n// with a known string slice (`<char>`).\nif cmp(argv[1], "--help") {\n    print_help();\n}'
              ],
            },
            {
              name: "hash",
              sig: "fn hash<T>(x: T) -> int",
              desc: "Computes a 64-bit FNV-1a hash. It is overloaded to accept either an integer or a character slice.",
              example: [
                "let h1 = hash(12345);\nprint(h1);\n\nlet h2 = hash(\"ren\");\nprint(h2);"
              ],
            },
          ],
        },
        {
          name: "Error Handling",
          functions: [
            {
              name: "panic",
              sig: "fn panic<T>(x: T)\nfn panic()",
              desc: "Prints an error message and terminates the program with exit code 1. If called with no arguments, it prints a generic 'PANIC' message. Often used with the `!` operator for conciseness.",
              example: [
                'let result = read("non_existent_file.txt");\n\nlet contents = result else err {\n    panic(err); // Panics with the error from read()\n}',
                "The '!' operator is a shortcut for the above:\n`let contents = read(\"must_exist.txt\")!;`"
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
                'let a = 5;\nassert(a == 5, "Value should have been 5"); // Continues\n\nassert(a > 10, "Value is not greater than 10"); // Panics'
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
                'type User = (name: <char>, id: int, active: bool, roles: <(<char>)>);\n\nlet user_data: User = (name: "Ren", id: 123, active: true, roles: ["admin", "editor"]);\n\nlet json_output = to_json(user_data);\n\nprint(json_output);',
                '// Output: {"name":"Ren","id":123,"active":true,"roles":["admin","editor"]}'
              ]
            },
            {
              name: "from_json",
              sig: "fn from_json<T>(json_str: <char>, out: *T) -> int ? <char>",
              desc: "Deserializes a JSON string into a Ren data structure. The target data structure must be passed as a mutable pointer. Returns an error on parsing failure.",
              example: [
                'type Config = (version: int, features: {<char>: bool});\n\nlet json_input = \'{"version": 2, "features": {"beta": true, "live": false}}\';\n\ndecl my_config: Config;\n\nfrom_json(json_input, &my_config)!;\n\nprint(my_config.version); // Prints 2\n\nif let enabled = my_config.features["beta"] { print(enabled); } // Prints true'
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
                "let my_array = [10, 20, 30, 40];\nprint(len(my_array));\n\nlet my_slice = my_array[1..3]; // [20, 30]\nprint(len(my_slice));",
                "Get the length of a stack-allocated array. This prints 4. Get the length of a slice. This prints 2.",
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
              sig: "copy(dest: *any, src: *any, count: int) -> void",
              desc: "Copies `count` elements from `src` to `dest`. All three arguments are required.",
              example: [
                "let src = [1, 2, 3];\nlet dest: [int] = [0, 0, 0];\n\ncopy(&dest, &src, 3);\n// dest is now [1, 2, 3]",
                "Define source and destination buffers of the same type and size. Copy 3 elements from `src` to `dest`. The destination must have enough capacity.",
              ],
            },
            {
              name: "sizeof",
              sig: "sizeof(type: type) -> int",
              desc: "Returns the size in bytes of the specified type. Requires one type argument.",
              example: [
                "print(sizeof(bool));\n\nprint(sizeof([int]));",
                "Get the size of a primitive type in bytes. This prints 1. Get the size of a complex type like a list, which is a pointer and a length. On a 64-bit system, this prints 16 (8 + 8).",
              ],
            },
            {
              name: "param",
              sig: "param(index: int) -> void",
              desc: "Fetches a function parameter at the specified index. Takes one argument.",
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
