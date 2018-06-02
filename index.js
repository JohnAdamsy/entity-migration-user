'use strict';

/**
 * Load Module Dependencies
 */
const co        = require('co');
const _         = require('lodash');
const chance   = require('chance')();

const CONFIG = {
  MIN_CODE_VALUE: 1000,
  MAX_CODE_VALUE: 100000
};

module.exports = (sequelize, DataTypes)=> {

  let MigrationUser = sequelize.define('MigrationUser', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },

    archived: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },

    is_enabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },

    code: {
      type: DataTypes.STRING
    },
    firstName: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    eyeColor: {
        type: DataTypes.ENUM('unspecified', 'green', 'blue', 'hazel'),
        allowNull: false,
    }
    
  },{

    underscored: true,
    
    freezeTableName: true,

    tableName: 'T_Migration_Users',

    hooks: {
      beforeCreate: (instance, options) => {

        // Use GUID to generate code
        let code = (chance.guid()).split('-')

        code = (code[Math.floor(Math.random() * code.length)]).toUpperCase();

        instance.code = instance.code ? instance.code : `MU${code}`;

      }
    }
  });

  MigrationUser.associate = (models) => {
    //associations come here
  };

  return MigrationUser;
};