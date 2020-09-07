import fetch from 'cross-fetch'
import FormData from 'form-data'

const {Fragment, Component}         = wp.element
const {withSelect, withDispatch}    = wp.data
const {compose}                     = wp.compose
const {Button}						= wp.components
const {__}							= wp.i18n
const {property}					= lodash

/**
 * Renders a NGG thumbnail
 */
export class NggThumbnail extends Component {
	state = {
		image_url: null,
		msg: __('Loading...')
	}

	componentDidUpdate(prevProps) {
		if (this.props.image_id != prevProps.image_id) {
			this.updateImageUrl()
		}
	}

	componentDidMount() {
		this.updateImageUrl()
	}

	updateImageUrl = () => {
		this.getImageUrl(this.props.image_id)
			.then(image_url => this.setState({image_url}))
			.catch((err) => console.log(err) && this.setState({msg: __("Could not load image")}))		
	}

	getImageUrl = image_id => {
		const data = new FormData()

		data.append('action', 'get_image')
		data.append('image_id', image_id)	

		return fetch(photocrati_ajax.url, {method: 'POST', body: data, headers: {'Accept': 'application/json'}})
			.then(res => res.json())
			.then(property('image.image_url'))
	}

	render() {
		const {msg} 		= this.state

		const style = {
			paddingTop: '5px',
			paddingBottom: '5px'
		}

		const el = this.state.image_url
			? <img src={this.state.image_url}/>
			: <span>{msg}</span>
		
		return (
			<div style={style}>{el}</div>
		)
	}
}

/**
 * Displays the NGG Post Thumbnail component, which is a wrapper
 * around the PostFeaturedImage component.
 * 
 * This exponent expects the following props:
 * 
 * @param PostFeaturedImage PostFeaturedImage
 * @param Function onUpdatePostThumbnail
 * @param Integer nggPostThumbnailId
 */
class PostThumbnail extends Component {

	// Open the modal window to select a Featured Image
	handleOpenClick = e => {
		const {currentPostId} = this.props
		top.set_ngg_post_thumbnail = this.onUpdatePostThumbnail
		tb_show("Set NextGEN Featured Image", ngg_featured_image.modal_url.replace(/%post_id%/, currentPostId))
	}

	// Remove the post thumbnail
	handleRemoveClick = e => {
		this.props.onRemoveNggPostThumbnail()
	}

	// Close the modal window and set the ngg_post_thumbnail post meta field
	onUpdatePostThumbnail = ngg_image_id => {
		tb_remove()
		this.props.onSetNggPostThumbnail(parseInt(ngg_image_id))
	}

	render() {
		const {PostFeaturedImage, nggPostThumbnailId} = this.props
		const buttonStyle = {marginTop: '10px'}

		return (
			<Fragment>
				{! nggPostThumbnailId && <PostFeaturedImage {...this.props}/>}

				<Button style={buttonStyle} onClick={this.handleOpenClick} className="editor-post-featured-image__toggle">
					{__('Set NextGEN Featured Image')}
				</Button>

				{nggPostThumbnailId > 0 && 
					<div>
						<NggThumbnail image_id={nggPostThumbnailId}/>
						<Button onClick={this.handleRemoveClick} className="is-link is-destructive">
							{__('Remove featured image')}
						</Button>
					</div>
				}
			</Fragment>
		)
		
	}
}

/**
 * A higher-order component used to provide the PostFeaturedImage prop
 * to the PostThumbnail component
 * @param PostFeaturedImage PostFeaturedImage 
 */
const nggPostThumbnail = PostFeaturedImage => props => (
	<PostThumbnail PostFeaturedImage={PostFeaturedImage} {...props}/>
)

/**
 * A higher-order component using the core/editor store which provides the following props
 * to the PostThumbnail component:
 * 
 * @param integer currentPostId			the id of the current post
 * @param integer nggPostThumbnailId	the NGG image id used as a post thumbnail for the post/page
 * @param integer featuredImageId		the media library image id used as a post thumbnail for the post/page 	
 */
const applyWithSelect = withSelect( ( select ) => {
	const { getCurrentPostId, getEditedPostAttribute } = select( 'core/editor' );
	const featuredImageId = getEditedPostAttribute( 'featured_media' );
	const meta = getEditedPostAttribute('meta')
	const nggPostThumbnailId = (typeof meta !== 'undefined' && meta.ngg_post_thumbnail) ? meta.ngg_post_thumbnail : null;

	return {
		currentPostId: getCurrentPostId(),
		featuredImageId,
		nggPostThumbnailId
	};
} );


/**
 * A higher-order component using the core/editor store which provides the following props
 * to the PostThumbnail component:
 * 
 * @param function onSetPostThumbnail
 */
const applyWithDispatch = withDispatch( ( dispatch ) => {
	const { editPost } = dispatch( 'core/editor' );
	return {
		onSetNggPostThumbnail(image_id) {
			var meta = wp.data.select('core/editor').getEditedPostAttribute('meta')
			if (typeof meta === 'undefined') {
				meta = {}
			}
			meta.ngg_post_thumbnail = image_id
			editPost({
				...meta,
				meta	
			})
		},
		
		onRemoveNggPostThumbnail() {
			const meta = wp.data.select('core/editor').getEditedPostAttribute('meta')
			meta.ngg_post_thumbnail = 0
			meta.featured_media = 0
			editPost({
				...meta,
				meta
			})
		},
	};	
} );

/** Export a composed component **/
export default PostFeaturedImage => compose(
	applyWithSelect,
	applyWithDispatch
)(nggPostThumbnail(PostFeaturedImage))
