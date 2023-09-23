const Goal = require('../models/goal')

// GET 
// route for Homepage

exports.home = async (req, res) => {
    const locals = {
        title: 'Goal Mosaic',
        description: 'Goal Tracker'
    }

    try {
        const goals = await Goal.find({}).limit(50)
        res.render('index', { locals, goals })
    } catch (error) {
        console.log(error)
    }
    
}


// GET 
// Route for New Goal Form
exports.addGoal = async (req, res) => {
    const locals = {
        title: 'Add New Goal',
        description: 'Goal Tracker'
    }
    res.render('goals/add', locals)
}


// POST 
// Create New Goal Form
exports.postGoal = async (req, res) => {
    console.log(req.body)

    const newGoal = new Goal({
        goal: req.body.goal,
        description: req.body.description,
        deadline: req.body.deadline,
        category: req.body.category,
        progress: req.body.progress,
    })

    try {
        await Goal.create(newGoal)
        res.redirect('/')
    }    catch (error) {
        console.log(error)
    }
    
}

// GET
// Goal Information
exports.view = async (req, res) => {

    try {
        const goal = await Goal.findOne({ _id: req.params.id })

        const locals = {
            title: 'View Goal',
            description: 'Goal Tracker',
        }
        res.render('goals/view', { locals, goal })
    } catch (error) {
        console.log(error)
    }
}


// GET
// Edit Goal Information
exports.edit = async (req, res) => {

    try {
        const goal = await Goal.findOne({ _id: req.params.id })

        const locals = {
            title: 'Edit Goal',
            description: 'Goal Tracker',
        }
        res.render('goals/edit', { locals, goal })
    } catch (error) {
        console.log(error)
    }
}


// GET
// Update Goal Information
exports.editPost = async (req, res) => {
    try {
        
        await Goal.findByIdAndUpdate(req.params.id,{
            goal: req.body.goal,
            description: req.body.description,
            deadline: req.body.deadline,
            category: req.body.category,
            progress: req.body.progress
        })

        await res.redirect(`/edit/${req.params.id}`)
        
    } catch (error) {
       
    }
}

// Delete
// Delete Goal Information
exports.deleteGoal = async (req, res) => {
    try {
        await Goal.deleteOne({ _id: req.params.id })
        res.redirect("/")
    } catch (error) {
       console.log(error)
    }
}


