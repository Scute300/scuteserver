'use strict'
const Post = use('App/Models/Post')
const Reply = use('App/Models/Reply')
const Cloudinary = use('Cloudinary')
const User = use('App/Models/User')
const Event = use('Event')
const { validate } = use('Validator')

class PostController {
    async post ({ request, auth, response }) {
        const user = auth.current.user
        // get currently authenticated user
        const postData = request.only(['post','image']);
        //console.log(userData);
        try{ 
            if (postData.image !== null && postData.post !== null ){
                let postPic = postData['image'];//request.file('avatar', { types: ['image'], size: '2mb' })
                console.log("Uploading pic");
                const resultado =  await Cloudinary.v2.uploader.upload(postPic);
                
                
                const post = new Post();
                post.user_id = user.id;
                post.post = postData.post;
                post.image = resultado.secure_url;
                post.imagepublicid = resultado.public_id;     
                await post.save();
                await post.loadMany(['user', 'favorites', 'replies'])
                
                return response.status(201).json(post);

            } else {
                const post = new Post();
                post.user_id = user.id;
                post.post = postData.post;
                await post.save();
                await post.loadMany(['user', 'favorites', 'replies']) 
                return response.status(201).json(post);
            }
        }catch(error) {
            return response.status(400).json({
                data:'wrong',
                message: 'Error del servidor'
            })
        }
        
}
    async show ({ params, response }) {
        try {
            const post = await Post.query()
                .where('id', params.id)
                .with('user')
                .with('replies')
                .with('replies.user')
                .with('favorites')
                .firstOrFail()

            const onepost = await post.toJSON()
            let postresponse = onepost
                postresponse.replies = onepost.replies.length
                postresponse.favorites = onepost.favorites.length
            
    
            return response.json({
                status: 'success',
                data: postresponse
            })
        } catch (error) {
            return response.status(404).json({
                status: 'error',
                message: 'No encontrado'
            })
        }
    }

    //reply
    async reply ({ request, auth, params, response }) {
        // get currently authenticated user
        const data = request.only(['reply'])
        // get tweet with the specified ID
        
        try{        
            const rules = {
                reply: 'required|string|max:200',
            }  
            const messages = {
                required: 'La respuesta no puede estar vacia',
                string: 'Porfavor introduce un caracter valido',
                max: 'El mensaje no puede exceder 200 caracteres'
            }

            const validation = await validate(data, rules, messages)
            if(validation.fails()){
                const message = validation.messages()
                let error = message[0]
                return response.status(400).json({
                    status: 'wrong',
                    message: error.message
                })
            } else {
                const user = auth.current.user
                const post = await Post.find(params.id)
                
                const reply = await Reply.create({
                    user_id: user.id,
                    post_id: post.id,
                    reply: request.input('reply')
                })
                await reply.load('user')
        
                return response.json({
                    status: 'success',
                    message: 'Respuesta publicada',
                    data: reply
                })
        

            }
        }catch(error){
            return response.status(400).json({
                status: 'wrong',
                message : error
            })
        }
    }
    async destroy ({ request, auth, params, response }) {
        // get currently authenticated user
        const user = auth.current.user
    
        // get tweet with the specified ID
        const post = await Post.query()
            .where('user_id', user.id)
            .where('id', params.id)
            .firstOrFail()

        const image = post.imagepublicid

            if(post.image !== null) {
                Cloudinary.v2.uploader.destroy(image)
                    
            }
    
        await post.delete()

        
    
        return response.json({
            status: 'success',
            message: 'Post Eliminado!',
            data: null
        })
    }


    async favorites ({response}){
        
        const post = await Post.query()
          .where('contadorf','>',1)  
          .whereNot('image', null)
          .with('user')
          .with('favorites')
          .with('replies')
          .orderBy('contadorf', 'DESC')
          .limit(7)
          .fetch()
        

            return response.json({
                status: 'success',
                data: post
          })
    }

    async usertimeline ({ auth, response, params }) {
        const user = await User.find(auth.current.user.id)
    
        // get an array of IDs of the user's followers
        const followersIds = await user.following().ids()
    
        // add the user's ID also to the array
        followersIds.push(user.id)
    
        let tweets = await Post.query()
            .whereIn('user_id', followersIds)
            .with('user')
            .with('favorites')
            .with('replies')
            .orderBy('created_at', 'DESC')
            .paginate(params.page, 3)


        return response.json({
            status: 'success',
            data: tweets
        })
    }
    async showprofileposts({params, request, response}){
        
        const data = request.only(['foo']);
        const page = parseInt(data.foo , 10);

        const post = await Post.query()
            .where('user_id', params.id)
            .whereNot('user_id',null)
            .with('user')
            .with('favorites')
            .with('replies')
            .orderBy('created_at', 'DESC')
            .paginate(page , 3)
    
            return response.json({
                status: 'success',
                data: post
        })

    }

    async getPostReplies({params, response, request}){
        try{
            const data = request.only(['foo']);
            const page = parseInt(data.foo , 10);

            const replies = await Reply.query()
            .where('post_id', params.id)
            .with('user')
            .orderBy('created_at', 'DESC')
            .paginate(page , 3)

            return response.json({
                status: 'success',
                data: replies
            })
        }catch(error){
            return response.status(400).json({
                data: 'wrong',
                message: 'error'
            })
        }
    }

}





module.exports = PostController
