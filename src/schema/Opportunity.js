import { Schema, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const OpportunitySchema = new Schema({
  user_id: {
    type: Number,
  },
  filter_id: {
    type: Number,
  },
  stage_id: {
    type: Number,
  },
  status: {
    type: String,
  },
  start: {
    type: Number,
  },
  limit: {
    type: Number,
  },
  sort: {
    type: String,
  },
  owned_by_you: {
    type: Number,
  },
  title: {},
  value: {},
});

OpportunitySchema.plugin(mongoosePaginate);

export default model('pipebling', OpportunitySchema);
