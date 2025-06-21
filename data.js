function get_data() {
  return [
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
            },
            {
              name: "mkdir",
              sig: "fn mkdir(path: <char>) -> int ? <char>",
              desc: "Creates a new directory at the given path. Returns an error message on failure.",
            },
            {
              name: "rmdir",
              sig: "fn rmdir(path: <char>) -> int ? <char>",
              desc: "Removes an empty directory at the specified path. Returns an error message if the directory is not empty or doesn't exist.",
            },
            {
              name: "rm",
              sig: "fn rm(path: <char>) -> int ? <char>",
              desc: "Deletes the file at the given path. Returns an error message on failure.",
            },
            {
              name: "exists",
              sig: "fn exists(path: <char>) -> bool",
              desc: "Checks if a file or directory exists at the given path.",
            },
            {
              name: "is_dir",
              sig: "fn is_dir(path: <char>) -> bool",
              desc: "Returns true if the path refers to a directory.",
            },
            {
              name: "list_dir",
              sig: "fn list_dir(path: <char>) -> [<char>] ? <char>",
              desc: "Lists all entries in the specified directory. Returns an error message on failure.",
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
            },
            {
              name: "eprint",
              sig: "fn eprint<T>(msg: T)",
              desc: "Prints the provided message to standard error.",
            },
            {
              name: "input",
              sig: "fn input() -> [char]",
              desc: "Reads a line of input from the user until a newline character is encountered.",
            },
            {
              name: "read",
              sig: "fn read(path: <char>) -> [char] ? <char>",
              desc: "Reads the contents of a file at the given path. Returns file contents or an error.",
            },
            {
              name: "write",
              sig: "fn write(path: <char>, data: <char>) -> int ? <char>",
              desc: "Writes data to the specified file path. Overwrites if the file exists.",
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
            },
            {
              name: "null_terminate",
              sig: "fn null_terminate(s: <char>) -> *char",
              desc: "Converts a string slice into a null-terminated string for C interoperability.",
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
            },
            {
              name: "arg_parse",
              sig: "fn arg_parse(args: <*char>, expected: <<char>>) -> int ? <char>",
              desc: "Parses arguments and ensures the correct number of arguments is passed.",
            },
            {
              name: "parse (int)",
              sig: "fn parse(str: *char, res: *int) -> int ? <char>",
              desc: "Parses a string into an integer. Returns an error on failure.",
            },
            {
              name: "parse (string)",
              sig: "fn parse(str: *char, res: *<char>) -> int ? <char>",
              desc: "Parses a string and stores a copy into the provided buffer.",
            },
            {
              name: "parse_opt",
              sig: "fn parse_opt<T>(argc: *int, argv: **char, name: <char>, opt: *?T) -> int ? <char>",
              desc: "Parses an optional command-line argument with the format --name <value>.",
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
            },
            {
              name: "init",
              sig: "fn init()",
              desc: "Initializes the memory allocator with default values.",
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
            },
            {
              name: "split",
              sig: "fn split<T>(sl: <T>, split: T) -> [<T>]",
              desc: "Splits a slice into sub-slices based on the given delimiter.",
            },
            {
              name: "init_map",
              sig: "fn init_map<K, V>(fields: <(K, V)>) -> {K: V}",
              desc: "Initializes a simple hash map with the given key-value pairs.",
            },
            {
              name: "insert",
              sig: "fn insert<K, V>(map_ref: *{K: V}, key: K, value: V)",
              desc: "Inserts a key-value pair into the hash map.",
            },
            {
              name: "get",
              sig: "fn get<K, V>(map: {K: V}, key: K) -> ?V",
              desc: "Retrieves a value from the hash map by key.",
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
            },
            {
              name: "hash",
              sig: "fn hash(x: int) -> int",
              desc: "Computes a simple 64-bit FNV-1a hash of an integer.",
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
            },
            {
              name: "sp",
              sig: "sp() -> *any",
              desc: "Returns the current stack pointer. Takes no arguments.",
            },
            {
              name: "copy",
              sig: "copy(dest: *any, src: *any, count: int) -> void",
              desc: "Copies `count` elements from `src` to `dest`. All three arguments are required.",
            },
            {
              name: "sizeof",
              sig: "sizeof(type: type) -> int",
              desc: "Returns the size in bytes of the specified type. Requires one type argument.",
            },
            {
              name: "param",
              sig: "param(index: int) -> void",
              desc: "Fetches a function parameter at the specified index. Takes one argument.",
            },
            {
              name: "istype",
              sig: "istype(val: any, type: type) -> bool",
              desc: "Checks if the given value matches the specified type. Takes one argument and one type argument.",
            },
          ],
        },
      ],
    },
  ];
}
