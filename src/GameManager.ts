import ThreeWorld from './ThreeWorld'
import { ScreenSize } from './ScreenSize'

class GameManager extends ThreeWorld {
	constructor(private screenSize: ScreenSize) {
		super(screenSize)
	}
}

export default GameManager
