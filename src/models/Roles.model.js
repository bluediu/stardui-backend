import { Schema, model } from 'mongoose';

const RoleSchema = Schema({
  role: {
    type: String,
    required: [true, 'Role is required'],
  },
});

export const RoleModel = model('Role', RoleSchema);
