export interface LevelNode {
  id: number;
  title: string;
  zone: string;
  type: 'concept' | 'quiz' | 'boss';
  xpReward: number;
  coinReward?: number;
  description?: string;
}

export interface ZoneMeta {
  name: string;
  minLevel: number;
  maxLevel: number;
  accentColor: string;
}

export const ZONES: ZoneMeta[] = [
  { name: 'Syntax Valley', minLevel: 1, maxLevel: 20, accentColor: '#00F0FF' },
  { name: 'Data Citadel', minLevel: 21, maxLevel: 32, accentColor: '#8B5CF6' },
  { name: 'Logic Labyrinth', minLevel: 33, maxLevel: 42, accentColor: '#F59E0B' },
  { name: 'Function Forge', minLevel: 43, maxLevel: 57, accentColor: '#EC4899' },
  { name: 'File & Exception Void', minLevel: 58, maxLevel: 62, accentColor: '#10B981' },
  { name: 'OOP Tower', minLevel: 63, maxLevel: 75, accentColor: '#FBBF24' },
  { name: 'Advanced Cyber Grid', minLevel: 76, maxLevel: 87, accentColor: '#3B82F6' },
  { name: 'Mastery Arena', minLevel: 88, maxLevel: 100, accentColor: '#EF4444' },
];

const RAW_TITLES = [
  "What is Python?", "Python Syntax", "Variables", "Data Types", "Type Conversion", "Input & Output", "Comments", "Operators",
  "Arithmetic Operators", "Comparison Operators", "Logical Operators", "Assignment Operators", "Identity Operators", "Membership Operators",
  "Bitwise Operators", "Strings Introduction", "String Indexing", "String Slicing", "String Methods", "String Formatting (f-strings)",
  "Lists", "List Indexing", "List Slicing", "List Methods", "Nested Lists", "Tuples", "Tuple Methods", "Sets", "Set Operations",
  "Dictionaries", "Dictionary Methods", "Boolean Values", "If Statement", "If-Else", "Elif", "Nested If", "Match-Case", "For Loop",
  "While Loop", "Break, Continue, Pass", "Loop Patterns", "Range Function", "Functions", "Function Arguments", "Return Statement",
  "Default Parameters", "Keyword Arguments", "Variable-Length Arguments (*args, **kwargs)", "Lambda Functions", "Recursion",
  "Scope (Local & Global)", "Modules", "Packages", "Import Statements", "Random Module", "Math Module", "Datetime Module",
  "File Handling (Read)", "File Handling (Write & Append)", "Exception Handling (try/except)", "Finally & Else", "Raising Exceptions",
  "Object-Oriented Programming", "Classes", "Objects", "Constructors (__init__)", "Instance Variables", "Class Variables",
  "Instance Methods", "Inheritance", "Method Overriding", "Polymorphism", "Encapsulation", "Abstraction", "Magic (Dunder) Methods",
  "Iterators", "Generators", "List Comprehensions", "Dictionary Comprehensions", "Set Comprehensions", "Decorators", "Context Managers",
  "Regular Expressions (Regex)", "JSON Handling", "CSV Handling", "Virtual Environments", "Pip & Package Management", "SQLite Database",
  "SQL with Python", "HTTP Requests (requests)", "REST API Basics", "Web Scraping (BeautifulSoup)", "Multithreading", "Multiprocessing",
  "Async Programming (asyncio)", "Unit Testing (unittest/pytest)", "Logging", "Project: CLI Application", "Project: Mini REST API",
  "Final Python Master Challenge"
];

export const PYTHON_100_LEVELS: LevelNode[] = RAW_TITLES.map((title, idx) => {
  const id = idx + 1;
  const zone = ZONES.find(z => id >= z.minLevel && id <= z.maxLevel)?.name || 'Syntax Valley';
  const isBoss = id % 10 === 0 || id >= 98;
  const isQuiz = id % 4 === 0 && !isBoss;

  return {
    id,
    title,
    zone,
    type: isBoss ? 'boss' : isQuiz ? 'quiz' : 'concept',
    xpReward: isBoss ? 250 : isQuiz ? 100 : 50,
    coinReward: isBoss ? 50 : isQuiz ? 20 : 10,
    description: `Master ${title} in the ${zone} realm of Py-Spark.`
  };
});
