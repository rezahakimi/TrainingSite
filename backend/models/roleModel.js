import mongoose from 'mongoose';

const roleSchema = mongoose.Schema(
  {
    name: {
      type: String
    },
  }
);

const Role = mongoose.model('Role', roleSchema);

export default Role;