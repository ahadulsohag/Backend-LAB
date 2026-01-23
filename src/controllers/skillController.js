// Sample skills data - in a real app, this would come from a database
let skills = [
  {
    id: 1,
    name: "JavaScript",
    category: "Programming Languages",
    level: "Expert",
    yearsOfExperience: 5,
    icon: "/images/skills/javascript.svg",
    color: "#F7DF1E"
  },
  {
    id: 2,
    name: "React",
    category: "Frameworks",
    level: "Advanced",
    yearsOfExperience: 3,
    icon: "/images/skills/react.svg",
    color: "#61DAFB"
  },
  {
    id: 3,
    name: "Node.js",
    category: "Runtime Environments",
    level: "Advanced",
    yearsOfExperience: 4,
    icon: "/images/skills/nodejs.svg",
    color: "#339933"
  },
  {
    id: 4,
    name: "Python",
    category: "Programming Languages",
    level: "Intermediate",
    yearsOfExperience: 2,
    icon: "/images/skills/python.svg",
    color: "#3776AB"
  },
  {
    id: 5,
    name: "MongoDB",
    category: "Databases",
    level: "Advanced",
    yearsOfExperience: 3,
    icon: "/images/skills/mongodb.svg",
    color: "#47A248"
  },
  {
    id: 6,
    name: "Docker",
    category: "DevOps",
    level: "Intermediate",
    yearsOfExperience: 2,
    icon: "/images/skills/docker.svg",
    color: "#2496ED"
  }
];

// GET all skills
const getAllSkills = (req, res) => {
  try {
    const { category, level } = req.query;
    
    let filteredSkills = skills;
    
    if (category) {
      filteredSkills = filteredSkills.filter(skill => 
        skill.category.toLowerCase() === category.toLowerCase()
      );
    }
    
    if (level) {
      filteredSkills = filteredSkills.filter(skill => 
        skill.level.toLowerCase() === level.toLowerCase()
      );
    }
    
    // Group by category
    const skillsByCategory = {};
    filteredSkills.forEach(skill => {
      if (!skillsByCategory[skill.category]) {
        skillsByCategory[skill.category] = [];
      }
      skillsByCategory[skill.category].push(skill);
    });
    
    res.json({
      skills: filteredSkills,
      skillsByCategory,
      categories: [...new Set(skills.map(skill => skill.category))],
      levels: ['Beginner', 'Intermediate', 'Advanced', 'Expert']
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch skills' });
  }
};

// GET skill by ID
const getSkillById = (req, res) => {
  try {
    const { id } = req.params;
    const skill = skills.find(s => s.id === parseInt(id));
    
    if (!skill) {
      return res.status(404).json({ error: 'Skill not found' });
    }
    
    res.json(skill);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch skill' });
  }
};

// POST new skill (admin functionality)
const createSkill = (req, res) => {
  try {
    const { name, category, level, yearsOfExperience, icon, color } = req.body;
    
    if (!name || !category || !level || !yearsOfExperience) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    const validLevels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
    if (!validLevels.includes(level)) {
      return res.status(400).json({ error: 'Invalid skill level' });
    }
    
    const newSkill = {
      id: Math.max(...skills.map(s => s.id)) + 1,
      name,
      category,
      level,
      yearsOfExperience: parseInt(yearsOfExperience),
      icon: icon || '/images/skills/default.svg',
      color: color || '#000000'
    };
    
    skills.push(newSkill);
    res.status(201).json(newSkill);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create skill' });
  }
};

// PUT update skill (admin functionality)
const updateSkill = (req, res) => {
  try {
    const { id } = req.params;
    const skillIndex = skills.findIndex(s => s.id === parseInt(id));
    
    if (skillIndex === -1) {
      return res.status(404).json({ error: 'Skill not found' });
    }
    
    if (req.body.level) {
      const validLevels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
      if (!validLevels.includes(req.body.level)) {
        return res.status(400).json({ error: 'Invalid skill level' });
      }
    }
    
    const updatedSkill = {
      ...skills[skillIndex],
      ...req.body,
      id: parseInt(id),
      yearsOfExperience: req.body.yearsOfExperience ? 
        parseInt(req.body.yearsOfExperience) : skills[skillIndex].yearsOfExperience
    };
    
    skills[skillIndex] = updatedSkill;
    res.json(updatedSkill);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update skill' });
  }
};

// DELETE skill (admin functionality)
const deleteSkill = (req, res) => {
  try {
    const { id } = req.params;
    const skillIndex = skills.findIndex(s => s.id === parseInt(id));
    
    if (skillIndex === -1) {
      return res.status(404).json({ error: 'Skill not found' });
    }
    
    skills.splice(skillIndex, 1);
    res.json({ message: 'Skill deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete skill' });
  }
};

module.exports = {
  getAllSkills,
  getSkillById,
  createSkill,
  updateSkill,
  deleteSkill
};