import jwt from "jsonwebtoken"
export const sendCookie = (user, res, message, statusCode = 200) => {

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    res.status(statusCode)
        .cookie('Task-Manager', token, {
            httpOnly: true, expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            sameSite: "none",
            secure: true,
        })
        .json({
            success: true,
            message,
        }
        );
}
export const tempCookie = (guest,res, message, statusCode = 200) => {
    const token = jwt.sign({ _id: guest._id }, process.env.JWT_SECRET);
    res.status(statusCode).cookie('Task-Guest', token, {
        httpOnly: true, expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        sameSite: "none",
        secure: true,
    })
        .json({
            success: true,
            message,
        }
        );
}