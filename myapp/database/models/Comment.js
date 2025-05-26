module.exports = function(sequelize, dataTypes){
    let alias = "Comment"
    
    let cols = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        id_producto: {
            type: dataTypes.INTEGER
        },
        usuario_id: {
            type: dataTypes.INTEGER
        },
        texto: {
            type: dataTypes.STRING(500)
        },
        created_at: {
            type: dataTypes.DATE
        },
        updated_at: {
            type: dataTypes.DATE
        }
    }   
    
    let config = {
        tableName: "comentarios",
        timestamps: false
    }

    let Comment = sequelize.define(alias, cols, config);
    Comment.associate = function(models){
        Comment.belongsTo(models.User, {
            as: "comments_users",
            foreignKey: "usuario_id"
        })
    }
    Comment.associate = function(models){
        Comment.belongsTo(models.Product, {
            as: "products_comments",
            foreignKey: "id_producto"
        })
    }
    return Comment;
}