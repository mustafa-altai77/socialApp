const httpStatus = require('http-status')
const catchAsync = require('../utils/catchAsync')
const { awsService, tokenService, userService, smsService } = require('../services')

const createUser = catchAsync(async (req, res) => {
  try {
    let data = await userService.createUser(req.body);
    const tokens = await tokenService.generateAuthTokens(data);
    // awsService.sendWelcomeCustomerEmail(data, req.body.password);
    res.status(httpStatus.OK).send({ user: data, token: tokens })
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({ message: 'Failed to create user.', details: error.message });
  }
});

const updateCustomerById = catchAsync(async (req, res) => {
  // let filter = pick(req.body, ['searchText']);
  try {
    const data = await userService.getUserByFilter({ _id: req?.user?._id });
    if (data) {
      const result = await userService.findByIdAndUpdate(data._id, req.body);
      res.status(httpStatus.OK).send(result)
    } else {
      res.status(httpStatus.BAD_REQUEST).json({ status: false, message: 'Failed to get Customer Data' });
    }
  }
  catch (err) {
    res.status(httpStatus.BAD_REQUEST).json({ status: false, message: err.message });
  }
});

module.exports = {
  createUser,
  updateCustomerById
}