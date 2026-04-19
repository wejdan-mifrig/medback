export const adminOnly = (req, res, next) => {
   
    const user = req.user;

    
    if (!user || (user.isExist && user.isExist.role !== "admin") && user.role !== "admin") {
        return res.status(401).json({ message: "Access denied!" });
    }

    next();
};