// Sample data - in a real app, this would come from a database
let projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce solution with React and Node.js",
    image: "/images/projects/ecommerce.jpg",
    technologies: ["React", "Node.js", "MongoDB", "Express"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example",
    featured: true,
    createdAt: "2024-01-15T00:00:00Z"
  },
  {
    id: 2,
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates",
    image: "/images/projects/taskapp.jpg",
    technologies: ["Vue.js", "Node.js", "Socket.io", "PostgreSQL"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example",
    featured: false,
    createdAt: "2024-01-10T00:00:00Z"
  },
  {
    id: 3,
    title: "Weather Dashboard",
    description: "A weather dashboard with location-based forecasts and data visualization",
    image: "/images/projects/weather.jpg",
    technologies: ["JavaScript", "HTML5", "CSS3", "Weather API"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example",
    featured: true,
    createdAt: "2024-01-05T00:00:00Z"
  }
];

// GET all projects
const getAllProjects = (req, res) => {
  try {
    const { featured, limit = 10, page = 1 } = req.query;
    
    let filteredProjects = projects;
    
    if (featured === 'true') {
      filteredProjects = projects.filter(project => project.featured);
    }
    
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    
    const paginatedProjects = filteredProjects.slice(startIndex, endIndex);
    
    res.json({
      projects: paginatedProjects,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(filteredProjects.length / limit),
        totalProjects: filteredProjects.length
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
};

// GET project by ID
const getProjectById = (req, res) => {
  try {
    const { id } = req.params;
    const project = projects.find(p => p.id === parseInt(id));
    
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch project' });
  }
};

// POST new project (admin functionality)
const createProject = (req, res) => {
  try {
    const { title, description, image, technologies, liveUrl, githubUrl, featured } = req.body;
    
    if (!title || !description || !technologies || !Array.isArray(technologies)) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    const newProject = {
      id: Math.max(...projects.map(p => p.id)) + 1,
      title,
      description,
      image: image || '/images/projects/default.jpg',
      technologies,
      liveUrl,
      githubUrl,
      featured: featured || false,
      createdAt: new Date().toISOString()
    };
    
    projects.push(newProject);
    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create project' });
  }
};

// PUT update project (admin functionality)
const updateProject = (req, res) => {
  try {
    const { id } = req.params;
    const projectIndex = projects.findIndex(p => p.id === parseInt(id));
    
    if (projectIndex === -1) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    const updatedProject = {
      ...projects[projectIndex],
      ...req.body,
      id: parseInt(id)
    };
    
    projects[projectIndex] = updatedProject;
    res.json(updatedProject);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update project' });
  }
};

// DELETE project (admin functionality)
const deleteProject = (req, res) => {
  try {
    const { id } = req.params;
    const projectIndex = projects.findIndex(p => p.id === parseInt(id));
    
    if (projectIndex === -1) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    projects.splice(projectIndex, 1);
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete project' });
  }
};

module.exports = {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
};