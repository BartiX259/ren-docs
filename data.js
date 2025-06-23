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
                "ren hello.re\n./out",
              ],
            },
            {
              name: "import",
              sig: "import <path>",
              desc: "Imports another Ren file, bringing its public functions and types into the current namespace. The path is relative and the `.re` extension is omitted.",
              example: [
                '// in file: my_lib.re\npub fn say_hi() {\n    print("Hi from my_lib!\\n");\n}',
                "Define a public function in `my_lib.re`.",
                "// in file: main.re\nimport my_lib\n\nfn main() {\n    say_hi(); // a direct call\n}",
                "Import `my_lib.re` and call its public function directly without a namespace qualifier.",
              ],
            },
          ],
        },
        {
          name: "Variables & Types",
          functions: [
            {
              name: "let (Variable Declaration)",
              sig: "let <name>: <type> = <value>",
              desc: "Declares a variable. The basic types are `int`, `char`, and `bool`.",
              example: [
                "let my_int = 5;\nlet my_char = 'a';\nlet my_bool = true;",
                "The type is inferred if not specified.",
              ],
            },
            {
              name: "<char> (String Slice)",
              sig: '"a string literal"',
              desc: "A string slice is an immutable view into a sequence of characters. String literals create slices.",
              example: [
                'let name: <char> = "Ren";',
                "String slices are immutable and cannot be modified directly.",
              ],
            },
            {
              name: "[char] (String List)",
              sig: '+"a string literal"',
              desc: "A string list is a mutable, heap-allocated list of characters. The `+` operator copies a slice to the heap to create a list.",
              example: [
                'let greeting: [char] = +"Hello";',
                "Create a mutable string by copying a slice to the heap.",
                "push(&greeting, '!');\nprint(greeting);",
                "The list can then be modified. This will print 'Hello!'.",
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
                "let list = +[1, 2, 3];",
                "Create a heap-allocated, resizable list by prefixing an array literal with `+`.",
                "push(&list, 4);\nprint(list[3]);",
                "Elements can be added to the list. This prints `4`.",
              ],
            },
            {
              name: "Slicing & Ranges",
              sig: "<collection>[start..end]",
              desc: "Creates a view into a collection using a range (`..`). Slices are iterable.",
              example: [
                "let arr1234 = [1, 2, 3, 4];\nlet sl23 = arr1234[1..3];",
                "Creates a slice `sl23` containing `[2, 3]`.",
                "let sl123 = arr1234[..3];",
                "Omitting the start index defaults to 0. Creates a slice `sl123` containing `[1, 2, 3]`.",
                "let sl234 = arr1234[1..];",
                "Omitting the end index defaults to the length of the collection. Creates `sl234` containing `[2, 3, 4]`.",
              ],
            },
            {
              name: "For Loop",
              sig: "for <var> in <iterable> { ... }",
              desc: "Iterates over any iterable type, such as a range, array, slice, or list.",
              example: [
                "for i in 0..5 {\n    print(i);\n}",
                "Iterating over a range. This will print the numbers 0 through 4.",
                'let names = ["A", "B", "C"];\nfor name in names {\n    print(name);\n}',
                "Iterating over an array slice. This will print 'A', 'B', and 'C'.",
              ],
            },
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
                'let point = (x: 1, y: 2, label: "start");',
                "Define a struct with named fields.",
                "print(point.label);",
                "Access fields using dot notation. This will print 'start'.",
              ],
            },
            {
              name: "Tuple",
              sig: "(val1, val2, ...)",
              desc: "An ordered collection of values, accessed by a numeric index.",
              example: [
                'let pair = (1, "asd");',
                "Define a tuple with values of different types.",
                "print(pair[0]);",
                "Access elements by their 0-based index. This will print `1`.",
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
                '// A generic function that works on a slice of any type T.\npub fn print_first<T>(sl: <T>) {\n    if len(sl) > 0 {\n        print(sl[0]);\n        print("\\n");\n    }\n}',
                "Type parameters like `<T>` allow the function to be generic.",
                'let nums = [10, 20, 30];\nprint_first(nums); // Prints 10\n\nlet names = ["Ren", "Lang"];\nprint_first(names); // Prints "Ren"',
                "The function is called without explicit types; the compiler infers them from the arguments.",
              ],
            },
          ],
        },
        {
          name: "Error handling",
          functions: [
            {
              name: "Error type",
              sig: "<ok type> ? <error type>",
              desc: "A union type for functions that can return either a success value or a failure value. Use `if let` to handle the result.",
              example: [
                "// This function returns a list of characters or an error message.\nfn read_file(path: <char>) -> [char] ? <char> { ... }",
                "The `?` in the return type indicates that the function can fail.",
                'let result = read_file("data.txt");',
                "The variable `result` now holds either a `[char]` on success or a `<char>` on failure.",
              ],
            },
            {
              name: "Optional type",
              sig: "?<type>",
              desc: "Represents a value that may be present or absent. It is a convenient shorthand for `<type> ? null`, where `null` is a special type indicating absence.",
              example: [
                "// This function tries to find a user and may return nothing.\nfn find_user(id: int) -> ?(name: <char>) { ... }",
                "The `?` prefix in the return type indicates the result is optional.",
                "let user = find_user(42);",
                "The `user` variable might contain a user struct or a `null`-like value if the user was not found.",
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
                'let config = read_file("config.ini")!',
                "If `config.ini` is crucial for the program to run, `!` ensures it doesn't proceed in an invalid state.",
                'print("Config loaded: "); print(config);',
                "This line will only execute if `read_file` succeeds. Otherwise, the program will crash with an error message.",
              ],
            },
            {
              name: "Unwrapping value",
              sig: "if let <ok name> = err_expr { ... } else <error name> { ... }",
              desc: "The idiomatic way to safely handle and unwrap error and optional types. It checks for the success variant, binding its value to `<ok name>`, or executes the `else` block with the error value.",
              example: [
                'let result = read_file("data.txt");',
                "First, call a function that returns a result.",
                'if let contents = result {\n  print("Success:\\n");\n  print(contents);\n} else err {\n  eprint("Error: ");\n  eprint(err);\n}',
                "The `if let` construct safely unwraps the result, allowing separate logic for success and failure cases.",
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
          name: "Filesystem",
          functions: [
            {
              name: "rename",
              sig: "fn rename(old_path: <char>, new_path: <char>) -> int ? <char>",
              desc: "Renames a file or directory from old_path to new_path. Returns an error message on failure.",
              example: [
                'let result = rename("old.txt", "new.txt");\nif let _ = result {} else err {\n    panic(err);\n}',
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
                'print("What is your name? ");\nlet name = input();',
                "Read a line of text from standard input into a mutable string list.",
                'print("Hello, ");\nprint(name);',
                "The captured input can then be used.",
              ],
            },
            {
              name: "read",
              sig: "fn read(path: <char>) -> [char] ? <char>",
              desc: "Reads the contents of a file at the given path. Returns file contents or an error.",
              example: [
                'if let contents = read("config.txt") {\n    print("File contents:\\n");\n    print(contents);\n} else err {\n    eprint("Failed to read config: ");\n    eprint(err);\n}',
              ],
            },
            {
              name: "write",
              sig: "fn write(path: <char>, data: <char>) -> int ? <char>",
              desc: "Writes data to the specified file path. Overwrites if the file exists.",
              example: [
                'write("log.txt", "This is a log message.\\n")!',
                "If `log.txt` cannot be written, the program will panic.",
              ],
            },
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
                "let my_int = 42;\nlet int_as_string = str(my_int);",
                "Convert an integer to a string slice. The type is inferred.",
                "let my_bool = true;\nlet bool_as_string = str(my_bool);",
                "It also works for other types like booleans, which become 'true' or 'false'.",
              ],
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
                '// Given a command line argument `argv[1]`\nlet my_num: int;\nif let _ = parse(argv[1], &my_num) {\n    print("Parsed number successfully!");\n} else err {\n    panic(err);\n}',
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
              name: "init",
              sig: "fn init()",
              desc: "Initializes the memory allocator with default values.",
              warn: "Shouldn't be used - called automatically",
            },
          ],
        },
        {
          name: "Data Structures",
          functions: [
            {
              name: "push",
              sig: "fn push<T>(list: *[T], el: T)",
              desc: "Pushes an element to a dynamically-sized list.",
              example: [
                "let my_list = +[10, 20];",
                "Start with a heap-allocated list.",
                "push(&my_list, 30);",
                "Push a new element onto the end of the list. `my_list` now contains `[10, 20, 30]`.",
              ],
            },
            {
              name: "split",
              sig: "fn split<T>(sl: <T>, split: T) -> [<T>]",
              desc: "Splits a slice into sub-slices based on the given delimiter.",
              example: [
                "let sentence = \"ren-is-fun\";\nlet parts = split(sentence, '-');",
                "Split a string slice by a delimiter character. The types are inferred.",
                'for part in parts {\n    print(part);\n    print(" ");\n}',
                "The result is a list of string slices. This will print 'ren is fun '.",
              ],
            },
            {
              name: "init_map",
              sig: "fn init_map<K, V>(fields: <(K, V)>) -> {K: V}",
              desc: "Initializes a simple hash map with the given key-value pairs.",
              warn: "Use the map declaration syntax instead (map = {key: value, ...}).",
            },
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
          ],
        },
        {
          name: "Utilities",
          functions: [
            {
              name: "cmp",
              sig: "fn cmp(l: *char, r: <char>) -> bool",
              desc: "Compares a null-terminated C-style string to a slice.",
              example: [
                '// Typically used for comparing command line args (`*char`)\n// with a known string slice (`<char>`).\nif cmp(argv[1], "--help") {\n    print_help();\n}',
                "Returns true if the strings are identical.",
              ],
            },
            {
              name: "hash",
              sig: "fn hash(x: int) -> int",
              desc: "Computes a simple 64-bit FNV-1a hash of an integer.",
              example: ["let h = hash(12345);\nprint(h);"],
            },
          ],
        },
        {
          name: "Error Handling",
          functions: [
            {
              name: "panic",
              sig: "fn panic<T>(x: T)",
              desc: "Prints an error message and terminates the program with exit code 1.",
              example: [
                'let result = read("non_existent_file.txt");',
                "Attempt an operation that can fail.",
                "if let _ = result { /* do nothing on success */ } else err {\n    panic(err); // Panics with the error from read()\n}",
                "The `!` operator is often a more concise way to panic on error: `read(...)!`",
              ],
            },
          ],
        },
      ],
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
                "let my_array = [10, 20, 30, 40];\nprint(len(my_array));",
                "Get the length of a stack-allocated array. This prints 4.",
                "let my_slice = my_array[1..3]; // [20, 30]\nprint(len(my_slice));",
                "Get the length of a slice. This prints 2.",
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
                "let src = [1, 2, 3];\nlet dest: [int] = [0, 0, 0];",
                "Define source and destination buffers of the same type and size.",
                "copy(&dest, &src, 3);\n// dest is now [1, 2, 3]",
                "Copy 3 elements from `src` to `dest`. The destination must have enough capacity.",
              ],
            },
            {
              name: "sizeof",
              sig: "sizeof(type: type) -> int",
              desc: "Returns the size in bytes of the specified type. Requires one type argument.",
              example: [
                "print(sizeof(bool));",
                "Get the size of a primitive type in bytes. This prints 1.",
                "print(sizeof([int]));",
                "Get the size of a complex type like a list, which is a pointer and a length. On a 64-bit system, this prints 16 (8 + 8).",
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
