const Course = require('../models/Course');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class MeController {
    // [GET] /stored/courses
    storedCourses(req, res, next) {
        let courseQuery = Course.find({});

        // if (req.query.hasOwnProperty("_sort")) {
        //   courseQuery = courseQuery.sort({
        //     [req.query.column]: req.query.type,
        //   });
        // }

        Promise.all([
            courseQuery,
            Course.countDocumentsWithDeleted({ deleted: true }),
        ])
            .then(([courses, deleteCount]) =>
                res.render('me/stored-courses', {
                    deleteCount,
                    courses: mutipleMongooseToObject(courses),
                }),
            )
            .catch(next);
    }

    // [GET] /me/trash/courses
    trashCourses(req, res, next) {
        Course.findDeleted({ deleted: true })
            .then((courses) => {
                res.render('me/trash-courses', {
                    courses: mutipleMongooseToObject(
                        courses.filter((course) => course.deleted),
                    ),
                });
            })
            .catch(next);
    }
}
//
module.exports = new MeController();
