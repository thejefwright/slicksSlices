const nodemailer = require('nodemailer');

function generateOrderEmail({ order, total }) {
  return `<div>
  <h2>Your recent order for ${total}</h2>
  <p>We will have your order ready in 20 minutes</p>
  <ul>
  ${order
    .map(
      (item) => `<li>
  <img src="${item.thumbnail}" alt="${item.name}" />
  ${item.size} ${item.name} - ${item.price}
  </li>`
    )
    .join('')}
  </ul>
  <p>Your order total is $${total} due at pick up.</p>
  </div>`;
}

// create a transport for nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

exports.handler = async (event, context) => {
  const body = JSON.parse(event.body);
  if (body.honeyPot) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: `You're a robot` }),
    };
  }
  // validate the data coming in
  const requiredFields = ['email', 'name', 'order'];
  for (const field of requiredFields) {
    console.log(field);
    if (!body[field]) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: `You're missing the ${field} field`,
        }),
      };
    }
  }

  if (!body.order.length) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: `you ordered nothing`,
      }),
    };
  }

  // send the email
  const info = await transporter.sendMail({
    from: "slick's Slices <slick@example.com>",
    to: `${body.name} <${body.email}>, orders@example.com`,
    subject: 'New Order',
    html: generateOrderEmail({ order: body.order, total: body.total }),
  });
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Success' }),
  };
};
