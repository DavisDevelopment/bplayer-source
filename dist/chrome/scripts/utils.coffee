
module.exports = do ->
	__all__ = {}
	util = (x, y) -> (__all__[x] = y)

	util 'dispose_image', ->
		do @remove
		delete this

	return __all__
