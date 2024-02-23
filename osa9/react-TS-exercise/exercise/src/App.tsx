interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartDescription {
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CoursePartDescription {
  backgroundMaterial: string;
  kind: "background"
}

interface CoursePartSpecial extends CoursePartDescription {
  requirements: string[]
  kind: "special"
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;

const Header = ({ name }: { name: string }) => {
  return (
    <div>
      <h1>{name}</h1>
    </div>
  )
}

const Part = ({ content } : { content: CoursePart }) => {
  const getContent = () => {
    switch(content.kind) {
      case "basic": 
        return [content.description]
      case "group":
        return [`project exercises ${content.groupProjectCount}`]
      case "background":
        return [content.backgroundMaterial, content.description]
      case "special":
        const skills = content.requirements
        return [content.description, `required skills: ${skills.join(", ")}`]
      default:
        return [null]
  }
  
  }
  return (
    <div key={content.name}>
      
      <h3>
        {content.name} {content.exerciseCount}
      </h3>
      <div>
        {getContent().map((item, index) => (
          <p key={index}>{item}</p>
        ))}
      </div>
    </div>
  )
}

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <div>
      {courseParts.map(part => (
        <Part key={part.name} content={part} />
      ))}
    </div>
  )
}

const Total = ({ amount }: { amount: number }) => {
  return (
    <div>
      <p>
        Number of exercises {amount}
      </p>
    </div>
  )
}

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group"
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
      kind: "background"
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special"
    },
  ];
  
  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  return (
    <div>
      <Header name={courseName} />
      <Content courseParts={courseParts} />
      <Total amount={totalExercises} />
    </div>
  );
};

export default App;