import { Topic, Lesson } from '../types/lesson';
import { Quiz } from '../types/quiz';
import { CodingProblem } from '../types/coding';

// Comprehensive mock data structured identically to Django REST API serializers
export const MOCK_TOPICS: Topic[] = [
  {
    id: 'top_basics',
    title: 'Python Basics & Variables',
    description: 'Master variables, data types, print outputs, and comments in Python.',
    iconName: 'Code',
    badgeColor: 'from-blue-500 to-cyan-400',
    difficulty: 'Beginner',
    totalLessons: 3,
    completedLessons: 2,
    xpReward: 350,
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80',
    lessons: [
      {
        id: 'les_variables',
        topicId: 'top_basics',
        title: 'Variables & String Printing',
        subtitle: 'Learn how to declare variables and output text in Python.',
        difficulty: 'Beginner',
        xpReward: 100,
        coinReward: 20,
        estimatedMinutes: 5,
        quizId: 'quiz_variables',
        codingChallengeId: 'code_variables_1',
        isCompleted: true,
        steps: [
          {
            id: 'step_1',
            title: 'Welcome to Python!',
            content: 'Python is a high-level, interpreted programming language known for its clear syntax and immense power in data science, AI, and backend web servers.',
            codeExample: {
              title: 'Outputting Text',
              code: 'print("Hello, Py-Spark Adventurer!")',
              explanation: 'The print() function outputs whatever text is enclosed inside quotes to the console output.',
            },
            tip: 'Double quotes ("...") or single quotes (\'...\') both work for strings in Python!',
          },
          {
            id: 'step_2',
            title: 'Storing Data in Variables',
            content: 'A variable acts like a labelled container for holding values like numbers, words, or boolean truth flags.',
            codeExample: {
              title: 'Creating Variables',
              code: 'player_name = "Sparky"\nplayer_level = 5\nis_active = True\n\nprint(player_name)\nprint(player_level)',
              explanation: 'In Python, you do not need explicit type keywords like var or let. Just write variable_name = value.',
            },
            tip: 'Use snake_case (lowercase with underscores) for Python variable names!',
          },
        ],
      },
      {
        id: 'les_data_types',
        topicId: 'top_basics',
        title: 'Python Data Types & Conversions',
        subtitle: 'Understand Integers, Floats, Strings, and Type Casting.',
        difficulty: 'Beginner',
        xpReward: 120,
        coinReward: 25,
        estimatedMinutes: 7,
        quizId: 'quiz_data_types',
        codingChallengeId: 'code_data_types_1',
        isCompleted: true,
        steps: [
          {
            id: 'step_1',
            title: 'Core Types in Python',
            content: 'Python supports numbers (int, float), text (str), boolean flags (bool), and collections.',
            codeExample: {
              title: 'Type Checking with type()',
              code: 'hp = 100          # int\nspeed = 4.5       # float\nhero = "Py-Hero"   # str\n\nprint(type(hp))\nprint(type(speed))',
              explanation: 'Use type(variable) to inspect the data type at runtime.',
            },
          },
        ],
      },
      {
        id: 'les_operators',
        topicId: 'top_basics',
        title: 'Math & Logic Operators',
        subtitle: 'Perform calculations and comparison logic.',
        difficulty: 'Beginner',
        xpReward: 130,
        coinReward: 25,
        estimatedMinutes: 8,
        quizId: 'quiz_operators',
        codingChallengeId: 'code_operators_1',
        isCompleted: false,
        steps: [
          {
            id: 'step_1',
            title: 'Arithmetic in Python',
            content: 'Python uses +, -, *, /, // (floor division), % (modulo remainder), and ** (exponent power).',
            codeExample: {
              title: 'Math Operators',
              code: 'damage = 15 * 3\ncritical = 2 ** 4 # 16\nremainder = 10 % 3 # 1\n\nprint("Total Damage:", damage)',
              explanation: 'Exponentiation operator ** calculates 2 to the power of 4.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'top_loops',
    title: 'Control Flow & Loops',
    description: 'Master If/Else conditions, For loops, and While loops to control game logic.',
    iconName: 'Repeat',
    badgeColor: 'from-purple-500 to-indigo-500',
    difficulty: 'Intermediate',
    totalLessons: 3,
    completedLessons: 1,
    xpReward: 450,
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80',
    lessons: [
      {
        id: 'les_if_else',
        topicId: 'top_loops',
        title: 'If, Elif, and Else Conditions',
        subtitle: 'Make smart decisions in your Python programs.',
        difficulty: 'Intermediate',
        xpReward: 140,
        coinReward: 30,
        estimatedMinutes: 8,
        quizId: 'quiz_if_else',
        codingChallengeId: 'code_if_else_1',
        isCompleted: true,
        steps: [
          {
            id: 'step_1',
            title: 'Conditional Branching',
            content: 'Execute specific code blocks only when conditions evaluate to True.',
            codeExample: {
              title: 'If-Elif-Else Statement',
              code: 'xp = 1200\n\nif xp >= 1500:\n    print("Rank: Silver")\nelif xp >= 500:\n    print("Rank: Bronze")\nelse:\n    print("Rank: Beginner")',
              explanation: 'Python uses indentation (4 spaces) to mark block scope!',
            },
          },
        ],
      },
      {
        id: 'les_for_loops',
        topicId: 'top_loops',
        title: 'For Loops & range()',
        subtitle: 'Repeat operations across sequences and ranges.',
        difficulty: 'Intermediate',
        xpReward: 150,
        coinReward: 30,
        estimatedMinutes: 10,
        quizId: 'quiz_for_loops',
        codingChallengeId: 'code_for_loops_1',
        isCompleted: false,
        steps: [
          {
            id: 'step_1',
            title: 'Iterating with range()',
            content: 'The range(start, stop, step) function generates a series of numbers.',
            codeExample: {
              title: 'For Loop Example',
              code: 'for i in range(1, 6):\n    print(f"Level {i} Cleared!")',
              explanation: 'Loop runs 5 times, with i taking values 1, 2, 3, 4, 5.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'top_functions',
    title: 'Functions & Modular Code',
    description: 'Write reusable functions, pass parameters, and return calculated values.',
    iconName: 'Zap',
    badgeColor: 'from-amber-500 to-orange-400',
    difficulty: 'Intermediate',
    totalLessons: 2,
    completedLessons: 0,
    xpReward: 500,
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80',
    lessons: [
      {
        id: 'les_functions_def',
        topicId: 'top_functions',
        title: 'Defining Custom Functions',
        subtitle: 'Create def functions with parameters and return values.',
        difficulty: 'Intermediate',
        xpReward: 160,
        coinReward: 35,
        estimatedMinutes: 10,
        quizId: 'quiz_functions',
        codingChallengeId: 'code_functions_1',
        isCompleted: false,
        steps: [
          {
            id: 'step_1',
            title: 'The def Keyword',
            content: 'Define custom functions using the def keyword followed by function name and parameters.',
            codeExample: {
              title: 'Function Definition',
              code: 'def calculate_xp(score, multiplier):\n    return score * multiplier\n\ntotal = calculate_xp(50, 2)\nprint("Earned XP:", total)',
              explanation: 'Functions return values using the return keyword.',
            },
          },
        ],
      },
    ],
  },
];

export const MOCK_QUIZZES: Record<string, Quiz> = {
  quiz_variables: {
    id: 'quiz_variables',
    lessonId: 'les_variables',
    title: 'Variables & Output Mastery Quiz',
    totalXpReward: 100,
    coinReward: 20,
    timeLimitSeconds: 180,
    questions: [
      {
        id: 'q1',
        question: 'Which of the following correctly prints text to the Python console?',
        codeSnippet: '',
        xpReward: 20,
        options: [
          { id: 'opt1', text: 'console.log("Hello")', isCorrect: false, explanation: 'console.log is used in JavaScript, not Python.' },
          { id: 'opt2', text: 'print("Hello")', isCorrect: true, explanation: 'print() is the standard Python console output function.' },
          { id: 'opt3', text: 'echo "Hello"', isCorrect: false, explanation: 'echo is used in Bash/PHP.' },
          { id: 'opt4', text: 'System.out.println("Hello")', isCorrect: false, explanation: 'This is Java syntax.' },
        ],
      },
      {
        id: 'q2',
        question: 'What is the correct way to assign the integer 50 to a variable named "score"?',
        codeSnippet: '',
        xpReward: 20,
        options: [
          { id: 'opt1', text: 'let score = 50', isCorrect: false, explanation: 'Python does not use the let keyword.' },
          { id: 'opt2', text: 'score := 50', isCorrect: false, explanation: ':= is the walrus operator, not standard variable assignment.' },
          { id: 'opt3', text: 'score = 50', isCorrect: true, explanation: 'In Python, variable assignment uses simple name = value syntax.' },
          { id: 'opt4', text: 'int score = 50', isCorrect: false, explanation: 'Python uses dynamic typing without type keywords.' },
        ],
      },
      {
        id: 'q3',
        question: 'What will be the output of this Python code snippet?',
        codeSnippet: 'name = "Py-Spark"\nprint("Level: " + name)',
        xpReward: 20,
        options: [
          { id: 'opt1', text: 'Level: Py-Spark', isCorrect: true, explanation: 'The + operator concatenates string variables in Python.' },
          { id: 'opt2', text: 'Level:name', isCorrect: false, explanation: 'name is evaluated to "Py-Spark".' },
          { id: 'opt3', text: 'Error: Cannot combine strings', isCorrect: false, explanation: 'Strings can be concatenated with +.' },
          { id: 'opt4', text: 'None', isCorrect: false, explanation: 'The string concatenation is valid.' },
        ],
      },
      {
        id: 'q4',
        question: 'Which of the following is a valid Python variable name?',
        codeSnippet: '',
        xpReward: 20,
        options: [
          { id: 'opt1', text: '2nd_player', isCorrect: false, explanation: 'Variable names cannot start with a digit.' },
          { id: 'opt2', text: 'player-rank', isCorrect: false, explanation: 'Hyphens are minus operators in Python.' },
          { id: 'opt3', text: 'player_rank_2', isCorrect: true, explanation: 'Letters, underscores, and trailing digits are valid Python identifiers.' },
          { id: 'opt4', text: 'class', isCorrect: false, explanation: 'class is a reserved Python keyword.' },
        ],
      },
      {
        id: 'q5',
        question: 'How do you create a single-line comment in Python?',
        codeSnippet: '',
        xpReward: 20,
        options: [
          { id: 'opt1', text: '// This is a comment', isCorrect: false, explanation: '// is used in C/C++/JS.' },
          { id: 'opt2', text: '# This is a comment', isCorrect: true, explanation: '# symbol starts a single-line comment in Python.' },
          { id: 'opt3', text: '/* This is a comment */', isCorrect: false, explanation: '/* */ is multi-line comments in C/CSS.' },
          { id: 'opt4', text: '-- This is a comment', isCorrect: false, explanation: '-- is SQL comment syntax.' },
        ],
      },
    ],
  },
  quiz_data_types: {
    id: 'quiz_data_types',
    lessonId: 'les_data_types',
    title: 'Python Data Types Quiz',
    totalXpReward: 120,
    coinReward: 25,
    timeLimitSeconds: 180,
    questions: [
      {
        id: 'q1',
        question: 'What is the data type of the expression: 3.14?',
        codeSnippet: '',
        xpReward: 24,
        options: [
          { id: 'opt1', text: 'int', isCorrect: false, explanation: 'int is for whole integers.' },
          { id: 'opt2', text: 'float', isCorrect: true, explanation: 'Decimal point numbers in Python are floats.' },
          { id: 'opt3', text: 'str', isCorrect: false, explanation: 'str is string text.' },
          { id: 'opt4', text: 'double', isCorrect: false, explanation: 'Python represents decimals as float.' },
        ],
      },
    ],
  },
};

export const MOCK_CODING_PROBLEMS: Record<string, CodingProblem> = {
  code_variables_1: {
    id: 'code_variables_1',
    lessonId: 'les_variables',
    title: 'Challenge: The Spark Greeting Generator',
    difficulty: 'Easy',
    description: 'Write a Python program that defines a string variable named `hero` set to `"Py-Spark"` and prints `"Hello, Py-Spark!"` to the console.',
    initialCode: `# Py-Spark Challenge: Greeting Generator
# 1. Define variable hero
# 2. Print "Hello, " + hero + "!"

hero = "Py-Spark"
print("Hello, " + hero + "!")
`,
    solutionCode: `hero = "Py-Spark"\nprint("Hello, " + hero + "!")`,
    hints: [
      'Define a variable named hero = "Py-Spark"',
      'Use print("Hello, " + hero + "!") or print(f"Hello, {hero}!")',
    ],
    xpReward: 150,
    coinReward: 30,
    testCases: [
      {
        id: 'tc1',
        input: '',
        expectedOutput: 'Hello, Py-Spark!',
        isSecret: false,
      },
    ],
  },
  code_data_types_1: {
    id: 'code_data_types_1',
    lessonId: 'les_data_types',
    title: 'Challenge: XP Calculator',
    difficulty: 'Easy',
    description: 'Calculate total XP by multiplying `base_xp` (50) by `multiplier` (3) and print the result.',
    initialCode: `base_xp = 50
multiplier = 3

total_xp = base_xp * multiplier
print(total_xp)
`,
    solutionCode: `base_xp = 50\nmultiplier = 3\nprint(base_xp * multiplier)`,
    hints: ['Multiply numbers with * operator'],
    xpReward: 150,
    coinReward: 30,
    testCases: [
      {
        id: 'tc1',
        input: '',
        expectedOutput: '150',
        isSecret: false,
      },
    ],
  },
};

export const lessonService = {
  async getTopics(): Promise<Topic[]> {
    await new Promise((r) => setTimeout(r, 100));
    return MOCK_TOPICS;
  },

  async getLessonById(topicId: string, lessonId: string): Promise<Lesson | null> {
    await new Promise((r) => setTimeout(r, 100));
    const topic = MOCK_TOPICS.find((t) => t.id === topicId);
    if (topic) {
      const found = topic.lessons.find((l) => l.id === lessonId);
      if (found) return found;
    }
    // Fallback dynamic lesson
    return {
      id: lessonId,
      topicId: topicId || 'top_basics',
      title: 'Python Core Concepts',
      subtitle: 'Master fundamental Python programming blocks.',
      difficulty: 'Beginner',
      xpReward: 100,
      coinReward: 20,
      estimatedMinutes: 5,
      quizId: `quiz_${lessonId}`,
      codingChallengeId: `code_${lessonId}`,
      isCompleted: false,
      steps: [
        {
          id: 'step_1',
          title: 'Understanding Python Foundations',
          content: 'Python provides clean, readable syntax and rich built-in data structures for building applications.',
          codeExample: {
            title: 'Sample Script',
            code: 'print("Welcome to Py-Spark Campaign!")',
            explanation: 'Use print() to display outputs.',
          },
          tip: 'Indentation matters in Python! Always use 4 spaces for blocks.',
        },
      ],
    };
  },

  async getQuizById(quizId: string): Promise<Quiz | null> {
    await new Promise((r) => setTimeout(r, 100));
    if (MOCK_QUIZZES[quizId]) return MOCK_QUIZZES[quizId];

    const levelMatch = quizId.match(/\d+/);
    const levelNum = levelMatch ? parseInt(levelMatch[0], 10) : 1;

    return {
      id: quizId,
      lessonId: `les_level_${levelNum}`,
      title: `Level ${levelNum} Concept Mastery Quiz`,
      totalXpReward: 100 + levelNum * 2,
      coinReward: 20 + levelNum,
      timeLimitSeconds: 180,
      questions: [
        {
          id: `q_${levelNum}_1`,
          question: `Which Python feature is showcased in Level ${levelNum}?`,
          codeSnippet: `level = ${levelNum}\nprint(f"Level {level} active!")`,
          xpReward: 20,
          options: [
            { id: 'opt1', text: 'f-string formatting', isCorrect: true, explanation: 'f-strings (f"...") insert variables directly into strings.' },
            { id: 'opt2', text: 'Static C pointers', isCorrect: false, explanation: 'Python does not use manual C pointer syntax.' },
            { id: 'opt3', text: 'HTML DOM queries', isCorrect: false, explanation: 'DOM queries belong to browser JavaScript.' },
            { id: 'opt4', text: 'Java Bytecode', isCorrect: false, explanation: 'Python code executes via Python VM.' },
          ],
        },
        {
          id: `q_${levelNum}_2`,
          question: 'What is the boolean evaluation of bool(1)?',
          codeSnippet: 'is_valid = bool(1)',
          xpReward: 20,
          options: [
            { id: 'opt1', text: 'True', isCorrect: true, explanation: 'Non-zero integers evaluate to True in Python.' },
            { id: 'opt2', text: 'False', isCorrect: false, explanation: '0 evaluates to False.' },
            { id: 'opt3', text: 'None', isCorrect: false, explanation: 'bool(1) returns boolean True.' },
            { id: 'opt4', text: 'TypeError', isCorrect: false, explanation: 'bool(1) is valid Python.' },
          ],
        },
        {
          id: `q_${levelNum}_3`,
          question: 'Which method adds an element to the end of a Python List?',
          codeSnippet: 'items = [1, 2]\nitems.append(3)',
          xpReward: 20,
          options: [
            { id: 'opt1', text: 'append()', isCorrect: true, explanation: 'append() adds an item to the end of a list.' },
            { id: 'opt2', text: 'push()', isCorrect: false, explanation: 'push() is JavaScript syntax.' },
            { id: 'opt3', text: 'add()', isCorrect: false, explanation: 'add() is used for Sets.' },
            { id: 'opt4', text: 'insert_end()', isCorrect: false, explanation: 'insert_end does not exist.' },
          ],
        },
        {
          id: `q_${levelNum}_4`,
          question: 'How do you check the length of a list in Python?',
          codeSnippet: 'data = [10, 20, 30]',
          xpReward: 20,
          options: [
            { id: 'opt1', text: 'len(data)', isCorrect: true, explanation: 'len() returns the total item count.' },
            { id: 'opt2', text: 'data.length', isCorrect: false, explanation: '.length is JavaScript.' },
            { id: 'opt3', text: 'data.size()', isCorrect: false, explanation: '.size() is Java/C++.' },
            { id: 'opt4', text: 'count(data)', isCorrect: false, explanation: 'len() is the standard built-in.' },
          ],
        },
        {
          id: `q_${levelNum}_5`,
          question: 'What keyword defines a function in Python?',
          codeSnippet: 'def quest():\n    return "Victory!"',
          xpReward: 20,
          options: [
            { id: 'opt1', text: 'def', isCorrect: true, explanation: 'def is the reserved keyword for functions in Python.' },
            { id: 'opt2', text: 'function', isCorrect: false, explanation: 'function is JS/PHP.' },
            { id: 'opt3', text: 'func', isCorrect: false, explanation: 'func is Go/Swift.' },
            { id: 'opt4', text: 'define', isCorrect: false, explanation: 'define is C preprocessor syntax.' },
          ],
        },
      ],
    };
  },

  async getCodingProblemById(problemId: string): Promise<CodingProblem | null> {
    await new Promise((r) => setTimeout(r, 100));
    if (MOCK_CODING_PROBLEMS[problemId]) return MOCK_CODING_PROBLEMS[problemId];

    const levelMatch = problemId.match(/\d+/);
    const levelNum = levelMatch ? parseInt(levelMatch[0], 10) : 1;

    return {
      id: problemId,
      lessonId: `les_level_${levelNum}`,
      title: `Boss Challenge: Level ${levelNum} Arena`,
      difficulty: levelNum > 50 ? 'Hard' : levelNum > 20 ? 'Medium' : 'Easy',
      description: `Write a Python program that defines variable \`level\` set to ${levelNum} and prints \`"Level ${levelNum} Cleared!"\`.`,
      initialCode: `# Py-Spark Boss Challenge: Level ${levelNum}\nlevel = ${levelNum}\nprint("Level " + str(level) + " Cleared!")\n`,
      solutionCode: `level = ${levelNum}\nprint("Level " + str(level) + " Cleared!")`,
      hints: [
        `Define variable level = ${levelNum}`,
        `Use print("Level " + str(level) + " Cleared!") or print(f"Level {level} Cleared!")`,
      ],
      xpReward: 150 + levelNum * 2,
      coinReward: 30 + levelNum,
      testCases: [
        {
          id: `tc_${levelNum}_1`,
          input: '',
          expectedOutput: `Level ${levelNum} Cleared!`,
          isSecret: false,
        },
      ],
    };
  },
};
