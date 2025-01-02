from flask import Blueprint, request, jsonify
from ..models import db, Myusers, Sport, Blog
from .user_blueprint import token_required

blog_blueprint = Blueprint('blog_blueprint', __name__)

# Create Blog API
@blog_blueprint.route('/blog', methods=['POST'])
@token_required()
def create_blog(current_user):
    try:
        data = request.get_json()
        title = data.get('title')
        content = data.get('content')
        sport_id = data.get('sport_id')

        # Validate data
        if not title or not content or not sport_id:
            return jsonify({"message": "Missing required fields"}), 400

        # Ensure sport_id is an integer
        if not isinstance(sport_id, int):
            return jsonify({"message": "Invalid sport_id format. It should be an integer."}), 400

        # Check if the sport exists by ID
        sport = Sport.query.get(sport_id)  # Query by ID instead of name
        if not sport:
            return jsonify({"message": "Invalid sport"}), 400

        # Create and add the blog
        blog = Blog(title=title, content=content, sport=sport, author=current_user)
        db.session.add(blog)
        db.session.commit()

        return jsonify({
            "message": "Blog created successfully"
        }), 201
    except Exception as e:
        return jsonify({"message": "Internal server error", "error": str(e)}), 500

# Get All Blogs API
@blog_blueprint.route('/blogs', methods=['GET'])
@token_required()
def get_all_blogs(current_user):
    try:
        # Get pagination parameters from the query string
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 10, type=int)

        # Validate pagination parameters
        if page < 1 or per_page < 1:
            return jsonify({"message": "Page number and per_page must be positive integers"}), 400

        # Base query to get all blogs, ordered by creation date
        query = Blog.query.order_by(Blog.created_at.desc())

        # Paginate the results
        paginated_blogs = query.paginate(page=page, per_page=per_page, error_out=False)

        # Prepare the response data
        result = []
        for blog in paginated_blogs.items:
            result.append({
                "id": blog.id,
                "title": blog.title,
                "content": blog.content,
                "created_at": blog.created_at,
                "sport": blog.sport.name,
                "author": blog.author.username,
                "gender": blog.author.gender  # Include gender from the author's details
            })

        # Prepare pagination metadata
        pagination_metadata = {
            "total_items": paginated_blogs.total,
            "total_pages": paginated_blogs.pages,
            "current_page": paginated_blogs.page,
            "per_page": paginated_blogs.per_page,
            "items": result
        }

        return jsonify(pagination_metadata), 200
    except Exception as e:
        return jsonify({"message": "Internal server error", "error": str(e)}), 500

# Get User Blogs API
@blog_blueprint.route('/blogs/<username>', methods=['GET'])
@token_required()
def get_user_blogs(current_user, username):
    try:
        # Get pagination parameters from the query string
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 10, type=int)

        # Validate pagination parameters
        if page < 1 or per_page < 1:
            return jsonify({"message": "Page number and per_page must be positive integers"}), 400

        # Query to get the user by the specified username
        user = Myusers.query.filter_by(username=username).first()
        if not user:
            return jsonify({"message": "User not found"}), 404

        # Query to get blogs by the user and order them by created_at
        query = Blog.query.filter_by(author=user).order_by(Blog.created_at.desc())

        # Paginate the results
        paginated_blogs = query.paginate(page=page, per_page=per_page, error_out=False)

        # Prepare the response data
        blogs = []
        for blog in paginated_blogs.items:
            blogs.append({
                "id": blog.id,
                "title": blog.title,
                "content": blog.content,
                "created_at": blog.created_at,
                "sport": blog.sport.name,
                "author": blog.author.username
            })
        # Return the response including gender and blogs
        response = {
            "username": user.username,
            "gender": user.gender,  # Add the gender here
            "items": blogs,
             "total_items": paginated_blogs.total,
            "total_pages": paginated_blogs.pages,
            "current_page": paginated_blogs.page,
            "per_page": paginated_blogs.per_page,
        }

        return jsonify(response), 200

    except Exception as e:
        return jsonify({"message": "Internal server error", "error": str(e)}), 500

# Delete Blog API
@blog_blueprint.route('/blog/<int:blog_id>', methods=['DELETE'])
@token_required()
def delete_blog(current_user, blog_id):
    try:
        blog = Blog.query.get(blog_id)

        if not blog:
            return jsonify({"message": "Blog not found"}), 404

        if blog.author.id != current_user.id:
            return jsonify({"message": "You are not authorized to delete this blog"}), 403

        db.session.delete(blog)
        db.session.commit()

        return jsonify({"message": "Blog deleted successfully"}), 200
    except Exception as e:
        return jsonify({"message": "Internal server error", "error": str(e)}), 500

@blog_blueprint.route('/top-creators', methods=['GET'])
@token_required()
def get_top_creators(current_user):
    try:
        # Aggregate blog counts by user
        top_creators_query = db.session.query(
            Myusers.username,
            Myusers.gender,
            db.func.count(Blog.id).label('blog_count')
        ).join(Blog, Myusers.id == Blog.user_id).group_by(Myusers.username, Myusers.gender).order_by(db.desc('blog_count')).limit(5)

        top_creators = top_creators_query.all()

        # Prepare the response data
        result = []
        for creator in top_creators:
            result.append({
                "username": creator.username,
                "gender": creator.gender,
                "blog_count": creator.blog_count
            })

        return jsonify(result), 200
    except Exception as e:
        return jsonify({"message": "Internal server error", "error": str(e)}), 500