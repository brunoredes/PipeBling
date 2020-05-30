import Opportunity from '../schema/Opportunity';

export default {
  async index(request, response) {
    // find opportunities from mongodb collection
    const opportunity = await Opportunity.find();

    return response.json(opportunity);
  },
};
