import Opportunity from '../schema/Opportunity';

export default {
  async store(request, response) {
    return response.status(201).json({ message: 'ok' });
  },

  async index(request, response) {
    const opportunity = await Opportunity.find();

    return response.json(opportunity);
  },
};
