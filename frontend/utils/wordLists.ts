// prettier-ignore
import { TestLanguage } from "@/shared/types/configTypes";

const english = [
  "the",
  "of",
  "and",
  "a",
  "to",
  "in",
  "he",
  "have",
  "it",
  "that",
  "for",
  "they",
  "me",
  "with",
  "as",
  "not",
  "on",
  "she",
  "at",
  "by",
  "this",
  "we",
  "you",
  "do",
  "but",
  "from",
  "or",
  "which",
  "one",
  "would",
  "all",
  "will",
  "there",
  "say",
  "who",
  "make",
  "when",
  "can",
  "more",
  "if",
  "no",
  "man",
  "out",
  "other",
  "so",
  "what",
  "time",
  "up",
  "go",
  "about",
  "than",
  "into",
  "could",
  "state",
  "only",
  "new",
  "year",
  "some",
  "take",
  "come",
  "these",
  "know",
  "see",
  "use",
  "get",
  "like",
  "then",
  "first",
  "any",
  "work",
  "now",
  "may",
  "such",
  "give",
  "over",
  "think",
  "most",
  "even",
  "find",
  "day",
  "also",
  "after",
  "way",
  "many",
  "must",
  "look",
  "before",
  "great",
  "back",
  "through",
  "long",
  "where",
  "much",
  "should",
  "well",
  "people",
  "down",
  "own",
  "just",
  "because",
  "good",
  "each",
  "those",
  "feel",
  "seem",
  "how",
  "high",
  "too",
  "place",
  "little",
  "world",
  "very",
  "nation",
  "hand",
  "old",
  "life",
  "tell",
  "write",
  "become",
  "here",
  "show",
  "house",
  "both",
  "between",
  "need",
  "mean",
  "call",
  "develop",
  "under",
  "last",
  "right",
  "move",
  "thing",
  "general",
  "school",
  "never",
  "same",
  "another",
  "begin",
  "while",
  "number",
  "part",
  "turn",
  "real",
  "leave",
  "might",
  "want",
  "point",
  "form",
  "off",
  "child",
  "few",
  "small",
  "since",
  "against",
  "ask",
  "late",
  "home",
  "interest",
  "large",
  "person",
  "end",
  "open",
  "public",
  "follow",
  "during",
  "present",
  "without",
  "again",
  "hold",
  "govern",
  "around",
  "possible",
  "head",
  "consider",
  "word",
  "program",
  "problem",
  "however",
  "lead",
  "system",
  "set",
  "order",
  "eye",
  "plan",
  "run",
  "keep",
  "face",
  "fact",
  "group",
  "play",
  "stand",
  "increase",
  "early",
  "course",
  "change",
  "help",
  "line",
  "still",
];

// prettier-ignore
const polish = ["i", "w", "z", "na", "do", "jest", "nie", "o", "a", "się", "co", "to", "jak", "po", "tak", "tylko", "czy", "też", "przez", "ale", "bardzo", "być", "bo", "już", "może", "jeszcze", "że", "dla", "gdzie", "jestem", "kto", "lub", "mnie", "niż", "pan", "by", "gdzie", "więc", "coś", "kiedy", "tym", "aż", "go", "czas", "teraz", "lubię", "ludzi", "wiem", "mam", "my", "te", "które", "albo", "był", "czego", "czasem", "dużo", "który", "moja", "nas", "nim", "niestety", "pod", "tyle", "trzeba", "twoje", "więcej", "aż", "chcę", "czym", "dla", "dlaczego", "dni", "dzień", "gdy", "gdyż", "głowy", "jest", "jutro", "których", "ktoś", "mi", "musi", "nasze", "nikt", "nimi", "nigdy", "nogi", "no", "pani", "panu", "ponieważ", "prawda", "prawo", "prawo", "proszę", "przy", "rzeczy", "sam", "sobie", "swoje", "swoje", "są", "takie", "także", "tam", "tobą", "trzeba", "twój", "wasze", "wasz", "wiele", "wiele", "więcej", "wszyscy", "wszystkich", "wszystko", "wtedy", "wy", "właśnie", "zawsze", "aż", "czasu", "czasu", "dobrze", "dość", "dwa", "dwie", "dziś", "gorąco", "jak", "jednak", "każdy", "kilka", "ktoś", "lat", "lat", "lubi", "lubisz", "ma", "mała", "miasta", "mniej", "moim", "można", "myślę", "mój", "mój", "na", "niech", "niego", "niewiele", "niektórzy", "niestety", "nigdzie", "nogi", "nogi", "nogi", "o", "od", "osoba", "osoby", "państwo", "poza", "pół", "później", "raz", "razem", "rozumieć", "ręce", "sam", "samo", "sobie", "sposób", "swoje", "swojej", "szybko", "tak", "takich", "takie", "także", "te", "też", "tobie", "tobą", "trzeba", "tutaj", "ty", "twoim", "twoja", "twoją", "twoje", "twój", "twój", "tych", "tylko", "tyle", "tym", "u", "w", "w", "ważne", "was", "wasz", "waszą", "wasze", "więc", "wiem", "wiele", "wielu", "więcej", "większość", "wszystko", "wszystkich", "wszystkie", "wszystkim", "wtedy", "wy", "właśnie", "z", "za", "za", "zawsze", "zbyt", "zł", "znów", "żadne", "żadnych", "że", "żeby", "życie", "żyć"];

// prettier-ignore
const cpp = ["auto", "break", "case", "catch", "class", "const", "constexpr", "continue", "decltype", "default", "delete", "do", "double", "dynamic_cast", "else", "enum", "explicit", "export", "extern", "false", "final", "float", "for", "friend", "goto", "if", "inline", "int", "int32_t", "long", "mutable", "namespace", "new", "nullptr", "operator", "private", "protected", "public", "register", "reinterpret_cast", "return", "short", "signed", "sizeof", "size_t", "static", "static_assert", "static_cast", "struct", "switch", "template", "this", "thread_local", "throw", "true", "try", "typedef", "typeid", "typename", "union", "unsigned", "using", "virtual", "void", "volatile", "wchar_t", "while", "accumulate", "all_of", "any_of", "binary_search", "copy", "count", "fill", "find", "generate", "max", "min", "reverse", "sort", "swap", "transform", "alignas", "alignof", "and", "asm", "bitand", "bitor", "char", "char16_t", "char32_t", "compl", "const_cast", "constexpr", "decltype", "dynamic_cast", "explicit", "false", "final", "float", "for", "if", "inline", "long", "mutable", "namespace", "new", "noexcept", "not", "not_eq", "nullptr", "or", "or_eq", "reinterpret_cast", "short", "signed", "sizeof", "static_assert", "static_cast", "struct", "switch", "template", "this", "throw", "true", "try", "typeid", "typename", "union", "unsigned", "using", "virtual", "void", "volatile", "wchar_t", "xor", "xor_eq"];

export const WORD_LISTS = {
  english,
  polish,
  "c++": cpp,
};
